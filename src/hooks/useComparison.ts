import { useState } from 'react';
import { toast } from 'sonner';
import { highlightText } from '@/components/comparison/highlightText';
import { comparisonCountries } from '@/constants/comparison';
import type {
  CompareLawRequest,
  CompareLawResponse,
  ComparisonResult,
} from '@/types/comparison';

export const useComparison = () => {
  const [topic, setTopic] = useState<string>('');
  const [country1, setCountry1] = useState<string>('');
  const [country2, setCountry2] = useState<string>('');
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);

  const extractHighlights = (summary: string): string[] => {
    const matches = summary.match(/\d+(?:\.\d+)?%|\$\d[\d,]*|\d+년|\d+개월|\d+만\s*엔/g) ?? [];
    return Array.from(new Set(matches)).slice(0, 6);
  };

  const toList = (value: string): string[] =>
    value
      .split(/\n|[•-]/g)
      .map((item) => item.trim())
      .filter(Boolean);

  const buildEndpoint = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL?.trim() ?? '';
    const path = '/api/v1/ai/compare';
    return baseUrl ? `${baseUrl}${path}` : path;
  };

  const handleCompare = async (): Promise<void> => {
    if (!topic || !country1 || !country2) {
      toast.error('주제와 두 국가를 모두 선택해주세요');
      return;
    }

    if (country1 === country2) {
      toast.error('서로 다른 국가를 선택해주세요');
      return;
    }

    setIsLoading(true);
    try {
      const firstCountry = comparisonCountries.find((c) => c.code === country1);
      const secondCountry = comparisonCountries.find((c) => c.code === country2);

      if (!firstCountry || !secondCountry) {
        toast.error('선택한 국가 정보가 올바르지 않습니다');
        return;
      }

      const payload: CompareLawRequest = {
        query: topic,
        country_id_1: firstCountry.id,
        country_id_2: secondCountry.id,
      };

      const response = await fetch(buildEndpoint(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const body = (await response.json()) as unknown;
      const data = body as CompareLawResponse;

      if (!response.ok || !data.success || !data.result) {
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
            toast.error(data.message || '비교 요청 중 오류가 발생했습니다');
            break;
        }
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
    } catch {
      toast.error('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요');
    } finally {
      setIsLoading(false);
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
