import { comparisonCountries } from '@/constants/comparison';
import type { ComparisonResult } from '@/types/comparison';

export const getMockComparisonResult = (
  country1Id: string,
  country2Id: string,
): ComparisonResult => {
  const c1 = comparisonCountries.find((c) => String(c.id) === country1Id);
  const c2 = comparisonCountries.find((c) => String(c.id) === country2Id);

  return {
    country1: {
      country: c1?.name ?? '미국 (연방)',
      summary: '첫 번째 국가의 법률 기준 요약입니다.',
      relatedLawIds: [12, 55],
    },
    country2: {
      country: c2?.name ?? '미국 - 캘리포니아',
      summary: '두 번째 국가의 법률 기준 요약입니다.',
      relatedLawIds: [88, 91],
    },
    comparison: {
      common: '두 국가 모두 해당 사안에 대한 법률 규정을 두고 있습니다.',
      diff: '처벌 수위, 적용 기준, 행정 제재 범위에서 차이가 있습니다.',
    },
  };
};
