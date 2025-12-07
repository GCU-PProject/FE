export type ComparisonCountryResult = {
  country: string;
  summary: string;
  highlights: string[];
  lawId: number;
};

export type ComparisonAnalysis = {
  common: string[];
  differences: string[];
};

export type ComparisonResult = {
  country1: ComparisonCountryResult;
  country2: ComparisonCountryResult;
  comparison: ComparisonAnalysis;
};

export type CountryOption = {
  code: string;
  name: string;
  flag: string;
};
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

