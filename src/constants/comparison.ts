import type { CountryOption } from '@/types/comparison';

export const comparisonCountries: CountryOption[] = [
  { id: 1, code: 'US', name: '미국 (연방)', flag: 'US' },
  { id: 2, code: 'US-CA', name: '미국 - 캘리포니아', flag: 'US' },
  { id: 3, code: 'US-NY', name: '미국 - 뉴욕', flag: 'US' },
  { id: 4, code: 'CA', name: '캐나다 (연방)', flag: 'CA' },
  { id: 5, code: 'CA-ON', name: '캐나다 - 온타리오', flag: 'CA' },
  { id: 6, code: 'CA-BC', name: '캐나다 - 브리티시컬럼비아', flag: 'CA' },
  { id: 7, code: 'AU', name: '호주 (연방)', flag: 'AU' },
  { id: 8, code: 'AU-NSW', name: '호주 - 뉴사우스웨일스', flag: 'AU' },
  { id: 9, code: 'AU-QLD', name: '호주 - 퀸즐랜드', flag: 'AU' },
  { id: 10, code: 'AU-WA', name: '호주 - 서호주', flag: 'AU' },
  { id: 11, code: 'AU-SA', name: '호주 - 남호주', flag: 'AU' },
  { id: 12, code: 'AU-TAS', name: '호주 - 태즈메이니아', flag: 'AU' },
  { id: 13, code: 'AU-NF', name: '호주 - 노퍽 섬', flag: 'AU' },
];

export const getCountryFlagUrl = (countryCode: string): string => {
  return `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;
};

export const findComparisonCountryName = (countryId: string): string => {
  return (
    comparisonCountries.find((country) => String(country.id) === countryId)
      ?.name ?? '선택 국가'
  );
};
