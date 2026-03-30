import { useState } from 'react';
import { toast } from 'sonner';
import { highlightText } from '@/components/comparison/highlightText';
import { comparisonCountries } from '@/constants/comparison';
import type { ComparisonResult } from '@/types/comparison';

export const useComparison = () => {
  const [topic, setTopic] = useState<string>('');
  const [country1, setCountry1] = useState<string>('');
  const [country2, setCountry2] = useState<string>('');
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);

  const handleCompare = (): void => {
    if (!topic || !country1 || !country2) {
      toast.error('주제와 두 국가를 모두 선택해주세요');
      return;
    }

    if (country1 === country2) {
      toast.error('서로 다른 국가를 선택해주세요');
      return;
    }

    setIsLoading(true);

    // TODO: 실제 API로 교체
    setTimeout(() => {
      const firstCountry =
        comparisonCountries.find((c) => c.code === country1)?.name ?? '';
      const secondCountry =
        comparisonCountries.find((c) => c.code === country2)?.name ?? '';

      setResult({
        country1: {
          country: firstCountry,
          summary:
            '혈중알코올농도 0.08% 이상인 상태에서 운전하는 것이 불법입니다. 초범의 경우 최대 $2,000의 벌금과 6개월 이하의 면허정지 처분을 받습니다. 재범 시에는 최대 $5,000의 벌금과 1년 이하의 면허취소가 적용됩니다.',
          highlights: [
            '혈중알코올농도 0.08%',
            '$2,000 벌금',
            '6개월 면허정지',
            '재범 시 가중처벌',
          ],
          lawId: 1,
        },
        country2: {
          country: secondCountry,
          summary:
            '음주운전 시 5년 이하의 징역 또는 100만 엔 이하의 벌금이 부과됩니다. 적발 즉시 면허가 취소되며, 동승자도 처벌 대상이 됩니다. 재범의 경우 더욱 엄격한 처벌이 적용됩니다.',
          highlights: [
            '5년 이하 징역',
            '100만 엔 벌금',
            '즉시 면허취소',
            '동승자 처벌',
          ],
          lawId: 2,
        },
        comparison: {
          common: [
            '음주운전 시 벌금 및 면허 정지/취소 처분',
            '재범 시 처벌 강화',
            '형사처벌 가능성',
          ],
          differences: [
            '미국: 혈중알코올농도 수치 기준 명확 (0.08%)',
            '일본: 동승자도 처벌 대상에 포함',
            '미국: 벌금형 중심',
            '일본: 징역형 우선 적용',
          ],
        },
      });

      setIsLoading(false);
      setShowResultModal(true);
    }, 1500);
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
