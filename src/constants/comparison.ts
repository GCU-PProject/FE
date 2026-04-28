import type { CountryOption } from '@/types/comparison';

export const comparisonCountries: CountryOption[] = [
  { id: 1, code: 'US', name: '미국', flag: '🇺🇸' },
  { id: 2, code: 'JP', name: '일본', flag: '🇯🇵' },
  { id: 3, code: 'DE', name: '독일', flag: '🇩🇪' },
  { id: 4, code: 'FR', name: '프랑스', flag: '🇫🇷' },
  { id: 5, code: 'GB', name: '영국', flag: '🇬🇧' },
  { id: 6, code: 'SG', name: '싱가포르', flag: '🇸🇬' },
  { id: 7, code: 'TH', name: '태국', flag: '🇹🇭' },
  { id: 8, code: 'CA', name: '캐나다', flag: '🇨🇦' },
];

// 국가별 국기 이미지 URL 생성 함수
export const getCountryFlagUrl = (countryCode: string): string => {
  return `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;
};