import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { compareLaws, LawComparisonApiError } from '@/api/lawComparison';
import { highlightText } from '@/components/comparison/highlightText';
import {
  comparisonCountries,
  findComparisonCountryName,
} from '@/constants/comparison';
import type { ComparisonResult } from '@/types/comparison';

export const useComparison = () => {
  const inFlightRef = useRef(false);
  const [topic, setTopic] = useState<string>('');
  const [country1, setCountry1] = useState<string>('');
  const [country2, setCountry2] = useState<string>('');
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);

  const handleCompare = async (): Promise<void> => {
    if (inFlightRef.current) {
      return;
    }

    const query = topic.trim();

    if (!query || !country1 || !country2) {
      toast.error('비교 주제와 두 국가를 모두 선택해주세요.');
      return;
    }

    if (country1 === country2) {
      toast.error('서로 다른 국가를 선택해주세요.');
      return;
    }

    inFlightRef.current = true;
    setIsLoading(true);

    try {
      const response = await compareLaws({
        query,
        country_id_1: Number(country1),
        country_id_2: Number(country2),
      });

      if (!response.result) {
        toast.error(response.message || '비교 결과가 없습니다.');
        return;
      }

      setResult({
        country1: {
          country: findComparisonCountryName(country1),
          summary: response.result.country_1_result.summary,
          relatedLawIds: response.result.country_1_result.related_law_ids,
        },
        country2: {
          country: findComparisonCountryName(country2),
          summary: response.result.country_2_result.summary,
          relatedLawIds: response.result.country_2_result.related_law_ids,
        },
        comparison: {
          common: response.result.compare_summary.common,
          diff: response.result.compare_summary.diff,
        },
      });
      setShowResultModal(true);
    } catch (error) {
      const message =
        error instanceof LawComparisonApiError
          ? error.message
          : '법률 비교 분석 중 오류가 발생했습니다.';
      toast.error(message);
    } finally {
      inFlightRef.current = false;
      setIsLoading(false);
    }
  };

  const handleSaveComparison = (): void => {
    toast.success('비교 결과가 저장되었습니다.');
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
