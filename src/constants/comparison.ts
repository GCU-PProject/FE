import type { CountryOption } from '@/types/comparison';

export const comparisonCountries: CountryOption[] = [
  { code: 'US', name: '미국', flag: '🇺🇸' },
  { code: 'JP', name: '일본', flag: '🇯🇵' },
  { code: 'DE', name: '독일', flag: '🇩🇪' },
  { code: 'FR', name: '프랑스', flag: '🇫🇷' },
  { code: 'GB', name: '영국', flag: '🇬🇧' },
  { code: 'SG', name: '싱가포르', flag: '🇸🇬' },
  { code: 'TH', name: '태국', flag: '🇹🇭' },
  { code: 'CA', name: '캐나다', flag: '🇨🇦' },
];

// 국가별 국기 이미지 URL 생성 함수
export const getCountryFlagUrl = (countryCode: string): string => {
  return `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;
};