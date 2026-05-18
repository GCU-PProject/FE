import { useState } from 'react';
import { getLegalRisk, LegalRiskApiError } from '@/api/legalRisk';
import type { LegalRiskRequest, LegalRiskResult } from '@/types/legalRisk';

export const useLegalRisk = () => {
  const [data, setData] = useState<LegalRiskResult | null>(null);
  const [error, setError] = useState<LegalRiskApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestLegalRisk = async (payload: LegalRiskRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getLegalRisk(payload);
      setData(result);
      return result;
    } catch (requestError) {
      const normalizedError =
        requestError instanceof LegalRiskApiError
          ? requestError
          : new LegalRiskApiError('법률 리스크 조회 중 오류가 발생했습니다.');

      setError(normalizedError);
      setData(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    error,
    isLoading,
    requestLegalRisk,
  };
};
