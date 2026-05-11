import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { highlightText } from '@/components/comparison/highlightText';
import { comparisonCountries } from '@/constants/comparison';
import type {
  CompareLawRequest,
  CompareLawResponse,
  ComparisonResult,
} from '@/types/comparison';

/** 법률 비교 API는 분석 시간이 길 수 있어 넉넉한 한도를 둡니다. */
const COMPARE_FETCH_TIMEOUT_MS = 120_000;
const DEFAULT_API_BASE_URL = 'https://api.glaw.site';

type UseComparisonInitialValues = {
  topic?: string;
  country1?: string;
  country2?: string;
};

export const useComparison = (initialValues?: UseComparisonInitialValues) => {
  const [topic, setTopic] = useState<string>(initialValues?.topic ?? '');
  const [country1, setCountry1] = useState<string>(
    initialValues?.country1 ?? '',
  );
  const [country2, setCountry2] = useState<string>(
    initialValues?.country2 ?? '',
  );
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const activeRequestIdRef = useRef(0);

  const extractHighlights = (summary: string): string[] => {
    const matches =
      summary.match(/\d+(?:\.\d+)?%|\$\d[\d,]*|\d+년|\d+개월|\d+만\s*엔/g) ??
      [];
    return Array.from(new Set(matches)).slice(0, 6);
  };

  const toList = (value: string): string[] =>
    value
      .split(/\r?\n/g)
      .map((item) => item.replace(/^[\s•-]+/, '').trim())
      .filter(Boolean);

  const buildEndpoint = () => {
    const baseUrl =
      import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/+$/, '') ??
      DEFAULT_API_BASE_URL;
    const path = '/api/v1/ai/compare';
    return baseUrl ? `${baseUrl}${path}` : path;
  };

  const parseJsonResponse = async (response: Response): Promise<unknown> => {
    const contentType = response.headers.get('content-type') ?? '';

    if (!contentType.includes('application/json')) {
      throw new Error(`INVALID_JSON_RESPONSE:${response.status}`);
    }

    return response.json();
  };

  const isCompareLawResponse = (
    data: CompareLawResponse,
  ): data is CompareLawResponse & {
    result: NonNullable<CompareLawResponse['result']>;
  } => {
    const result = data.result;

    return Boolean(
      result?.country_1_result &&
        typeof result.country_1_result.summary === 'string' &&
        Array.isArray(result.country_1_result.related_law_ids) &&
        result?.country_2_result &&
        typeof result.country_2_result.summary === 'string' &&
        Array.isArray(result.country_2_result.related_law_ids) &&
        result?.compare_summary &&
        typeof result.compare_summary.common === 'string' &&
        typeof result.compare_summary.diff === 'string',
    );
  };

  const handleCompare = async (): Promise<void> => {
    if (isLoading) {
      return;
    }

    if (!topic || !country1 || !country2) {
      toast.error('주제와 두 국가를 모두 선택해주세요');
      return;
    }

    if (country1 === country2) {
      toast.error('서로 다른 국가를 선택해주세요');
      return;
    }

    const firstCountry = comparisonCountries.find((c) => c.code === country1);
    const secondCountry = comparisonCountries.find((c) => c.code === country2);

    if (!firstCountry || !secondCountry) {
      toast.error('선택한 국가 정보가 올바르지 않습니다');
      return;
    }

    setIsLoading(true);
    setResult(null);
    setShowResultModal(false);
    const requestId = activeRequestIdRef.current + 1;
    activeRequestIdRef.current = requestId;
    let compareTimeoutId: number | undefined;
    try {
      const payload: CompareLawRequest = {
        query: topic,
        country_id_1: firstCountry.id,
        country_id_2: secondCountry.id,
      };

      const controller = new AbortController();
      compareTimeoutId = window.setTimeout(() => {
        controller.abort();
      }, COMPARE_FETCH_TIMEOUT_MS);

      const endpoint = buildEndpoint();
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
        credentials: 'include',
      });

      const body = await parseJsonResponse(response);
      const data = body as CompareLawResponse;

      if (!response.ok || !data.success || !data.result) {
        console.error('Compare API request failed', {
          endpoint,
          status: response.status,
          data,
        });

        switch (data.code) {
          case 'COMMON400':
            toast.error('입력값을 확인해주세요');
            break;
          case 'AI_COMPARE_SAME_COUNTRY':
            toast.error('서로 다른 국가를 선택해주세요');
            break;
          case 'AI_COMPARE_COUNTRY_NOT_FOUND':
            toast.error(data.message || '존재하지 않는 국가 ID입니다');
            break;
          case 'AI_DB_CONNECTION_FAILED':
            toast.error('서버 연결이 불안정합니다. 잠시 후 다시 시도해주세요');
            break;
          case 'AI_COMPARE_ANALYSIS_FAILED':
            toast.error('비교 분석에 실패했습니다. 다시 시도해주세요');
            break;
          default:
            toast.error(
              data.message ||
                `비교 요청 중 오류가 발생했습니다. (${response.status})`,
            );
            break;
        }
        return;
      }

      if (!isCompareLawResponse(data)) {
        console.error('Invalid compare API response shape', data);
        toast.error('응답 데이터 형식이 올바르지 않습니다');
        return;
      }

      if (activeRequestIdRef.current !== requestId) {
        return;
      }

      const mappedResult: ComparisonResult = {
        country1: {
          country: firstCountry.name,
          summary: data.result.country_1_result.summary,
          highlights: extractHighlights(data.result.country_1_result.summary),
          lawIds: data.result.country_1_result.related_law_ids,
        },
        country2: {
          country: secondCountry.name,
          summary: data.result.country_2_result.summary,
          highlights: extractHighlights(data.result.country_2_result.summary),
          lawIds: data.result.country_2_result.related_law_ids,
        },
        comparison: {
          common: toList(data.result.compare_summary.common),
          differences: toList(data.result.compare_summary.diff),
        },
      };

      setResult(mappedResult);
      setShowResultModal(true);
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        toast.error('요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요');
      } else if (
        error instanceof Error &&
        error.message.startsWith('INVALID_JSON_RESPONSE')
      ) {
        const status = error.message.split(':')[1];
        toast.error(
          `API 응답 형식이 올바르지 않습니다. 백엔드 주소 또는 프록시 설정을 확인해주세요. (${status})`,
        );
      } else {
        console.error('Compare API network error', error);
        toast.error('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요');
      }
    } finally {
      if (compareTimeoutId !== undefined) {
        window.clearTimeout(compareTimeoutId);
      }
      if (activeRequestIdRef.current === requestId) {
        setIsLoading(false);
      }
    }
  };

  const handleSaveComparison = (): void => {
    toast.success('비교 조합이 저장되었습니다');
  };

  return {
    topic,
    country1,
    country2,
    result,
    isLoading,
    showResultModal,
    setShowResultModal,
    setTopic,
    setCountry1,
    setCountry2,
    handleCompare,
    handleSaveComparison,
    highlightText,
    comparisonCountries,
  };
};
