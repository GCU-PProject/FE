import { apiClient } from '@/api/client';
import type {
  CompareLawApiResponse,
  CompareLawRequest,
} from '@/types/comparison';

const LAW_COMPARE_PATH = import.meta.env.VITE_LAW_COMPARE_PATH ?? '/api/compare';

type HttpError = {
  response?: {
    data?: unknown;
    status?: number;
  };
};

const isHttpError = (error: unknown): error is HttpError =>
  typeof error === 'object' && error !== null && 'response' in error;

export class LawComparisonApiError extends Error {
  status?: number;
  code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = 'LawComparisonApiError';
    this.status = status;
    this.code = code;
  }
}

export const compareLaws = async (
  payload: CompareLawRequest,
): Promise<CompareLawApiResponse> => {
  try {
    const { data } = await apiClient.post<CompareLawApiResponse>(
      LAW_COMPARE_PATH,
      payload,
      { timeout: 120_000 },
    );

    if (!data.success || data.result === null) {
      throw new LawComparisonApiError(
        data.message || '법률 비교 분석에 실패했습니다.',
        data.status,
        data.code,
      );
    }

    return data;
  } catch (error) {
    if (error instanceof LawComparisonApiError) {
      throw error;
    }

    if (isHttpError(error)) {
      const data = error.response?.data as
        | Partial<CompareLawApiResponse>
        | undefined;
      throw new LawComparisonApiError(
        data?.message || '법률 비교 분석에 실패했습니다.',
        data?.status ?? error.response?.status,
        data?.code,
      );
    }

    throw new LawComparisonApiError(
      '법률 비교 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    );
  }
};
