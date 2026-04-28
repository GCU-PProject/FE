import { comparisonCountries } from '@/constants/comparison';
import type { ComparisonResult } from '@/types/comparison';

export const getMockComparisonResult = (
  country1Code: string,
  country2Code: string,
): ComparisonResult => {
  const c1 = comparisonCountries.find((c) => c.code === country1Code);
  const c2 = comparisonCountries.find((c) => c.code === country2Code);

  return {
    country1: {
      country: c1?.name ?? '미국',
      summary:
        '미국의 음주운전 관련 법률은 주(State)별로 차이가... (생략)',
      highlights: ['0.08% 기준', '주별 차이', '벌금형', '면허 정지', '시동장치 잠금'],
      lawIds: [1],
    },
    country2: {
      country: c2?.name ?? '일본',
      summary:
        '일본의 도로교통법은 음주운전에 대해 매우 엄격... (생략)',
      highlights: ['0.03% 기준', '엄격한 처벌', '동승자 처벌', '5년 이하 징역', '100만엔 벌금'],
      lawIds: [2],
    },
    comparison: {
      common: [
        '음주운전에 대한 법적 규제가 존재합니다',
        '혈중알코올농도를 기준으로 판단합니다',
        '재범에 대해 가중 처벌을 적용합니다',
        '면허 정지 또는 취소 처분이 가능합니다',
      ],
      differences: [
        '미국은 0.08%, 일본은 0.03%로 기준이 다릅니다',
        '일본은 동승자와 주류 제공자도 처벌 대상에 포함됩니다',
        '일본의 처벌이 상대적으로 더 엄격합니다',
        '미국은 주별 법률이 다르지만 일본은 전국 통일 기준입니다',
      ],
    },
  };
};
