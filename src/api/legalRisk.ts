import { apiClient } from '@/api/client';
import type {
  ApiErrorResponse,
  ApiResponse,
  LegalRiskRequest,
  LegalRiskResult,
} from '@/types/legalRisk';

const LEGAL_RISK_PATH = import.meta.env.VITE_LEGAL_RISK_PATH ?? '/api/risk';

type HttpError = {
  response?: {
    data?: unknown;
    status?: number;
  };
};

const isHttpError = (error: unknown): error is HttpError =>
  typeof error === 'object' && error !== null && 'response' in error;

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
    const { data } = await apiClient.post<ApiResponse<LegalRiskResult>>(
      LEGAL_RISK_PATH,
      payload,
    );

    return data.result;
  } catch (error) {
    if (isHttpError(error)) {
      const data = error.response?.data as ApiErrorResponse | undefined;
      throw new LegalRiskApiError(
        data?.message ?? '법률 리스크 조회에 실패했습니다.',
        data?.status ?? error.response?.status,
        data?.code,
      );
    }

    throw new LegalRiskApiError('법률 리스크 조회 중 오류가 발생했습니다.');
  }
};
