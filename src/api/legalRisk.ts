import { apiClient } from '@/api/client';
import type {
  ApiErrorResponse,
  ApiResponse,
  LegalRiskRequest,
  LegalRiskResult,
  RiskLevel,
} from '@/types/legalRisk';

const LEGAL_RISK_PATH = import.meta.env.VITE_LEGAL_RISK_PATH ?? '/api/risk';

type LegalRiskRawResult = LegalRiskResult | string;

type HttpError = {
  response?: {
    data?: unknown;
    status?: number;
  };
};

const isHttpError = (error: unknown): error is HttpError =>
  typeof error === 'object' && error !== null && 'response' in error;

const isRiskLevel = (value: unknown): value is RiskLevel =>
  value === 'LOW' || value === 'MEDIUM' || value === 'HIGH';

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

const isLawRefs = (
  value: unknown,
): value is LegalRiskResult['risk_list'][number]['law_refs'] =>
  Array.isArray(value) &&
  value.every((law) => {
    if (typeof law !== 'object' || law === null) {
      return false;
    }

    const lawRef = law as Partial<
      LegalRiskResult['risk_list'][number]['law_refs'][number]
    >;
    return (
      typeof lawRef.law_id === 'number' &&
      typeof lawRef.law_type === 'string' &&
      typeof lawRef.article_no === 'string'
    );
  });

const isIssueRefs = (
  value: unknown,
): value is NonNullable<LegalRiskResult['risk_list'][number]['issue_refs']> =>
  value === undefined ||
  (Array.isArray(value) &&
    value.every((issue) => {
      if (typeof issue !== 'object' || issue === null) {
        return false;
      }

      const issueRef = issue as Partial<
        NonNullable<LegalRiskResult['risk_list'][number]['issue_refs']>[number]
      >;
      return (
        typeof issueRef.issue_id === 'number' &&
        typeof issueRef.title === 'string' &&
        typeof issueRef.url === 'string' &&
        typeof issueRef.published_date === 'string'
      );
    }));

const isLegalRiskResult = (value: unknown): value is LegalRiskResult => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const result = value as Partial<LegalRiskResult>;
  return (
    typeof result.country_id === 'number' &&
    isRiskLevel(result.overall_risk_level) &&
    Array.isArray(result.risk_list) &&
    result.risk_list.every((risk) => {
      if (typeof risk !== 'object' || risk === null) {
        return false;
      }

      const riskItem = risk as Partial<LegalRiskResult['risk_list'][number]>;
      return (
        typeof riskItem.risk_title === 'string' &&
        isRiskLevel(riskItem.risk_level) &&
        typeof riskItem.risk_content === 'string' &&
        isStringArray(riskItem.risk_actions) &&
        isLawRefs(riskItem.law_refs) &&
        isIssueRefs(riskItem.issue_refs)
      );
    })
  );
};

const parseStringResult = (result: string): unknown => {
  try {
    return JSON.parse(result);
  } catch {
    return result;
  }
};

const normalizeLegalRiskResult = (
  result: LegalRiskRawResult,
  payload: LegalRiskRequest,
): LegalRiskResult => {
  const parsedResult = typeof result === 'string' ? parseStringResult(result) : result;

  if (isLegalRiskResult(parsedResult)) {
    return parsedResult;
  }

  if (typeof parsedResult === 'string' && parsedResult.trim()) {
    return {
      country_id: payload.country_id,
      overall_risk_level: 'MEDIUM',
      risk_list: [
        {
          risk_title: '위험 지수 분석 결과',
          risk_level: 'MEDIUM',
          risk_content: parsedResult,
          risk_actions: [],
          law_refs: [],
          issue_refs: [],
        },
      ],
    };
  }

  throw new LegalRiskApiError('위험 지수 응답 형식이 올바르지 않습니다.');
};

export class LegalRiskApiError extends Error {
  status?: number;
  code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = 'LegalRiskApiError';
    this.status = status;
    this.code = code;
  }
}

export const getLegalRisk = async (
  payload: LegalRiskRequest,
): Promise<LegalRiskResult> => {
  try {
    const { data } = await apiClient.post<ApiResponse<LegalRiskRawResult>>(
      LEGAL_RISK_PATH,
      payload,
      { timeout: 120_000 },
    );

    if (!data.success || data.result === null || data.result === undefined) {
      throw new LegalRiskApiError(
        data.message || '위험 지수 조회에 실패했습니다.',
        data.status,
        data.code,
      );
    }

    return normalizeLegalRiskResult(data.result, payload);
  } catch (error) {
    if (error instanceof LegalRiskApiError) {
      throw error;
    }

    if (isHttpError(error)) {
      const data = error.response?.data as ApiErrorResponse | undefined;
      throw new LegalRiskApiError(
        data?.message ?? '위험 지수 조회에 실패했습니다.',
        data?.status ?? error.response?.status,
        data?.code,
      );
    }

    throw new LegalRiskApiError('위험 지수 조회 중 오류가 발생했습니다.');
  }
};
