export type InterestCountry = {
  code: string;
  name: string;
  flag: string;
};

// 관심 국가 선택 모달과 뉴스 필터에서 사용하는 ISO 국가 코드 순서형 데이터
export const INTEREST_COUNTRIES: InterestCountry[] = [
  { code: 'US', name: '미국', flag: '🇺🇸' },
  { code: 'JP', name: '일본', flag: '🇯🇵' },
  { code: 'CN', name: '중국', flag: '🇨🇳' },
  { code: 'GB', name: '영국', flag: '🇬🇧' },
  { code: 'FR', name: '프랑스', flag: '🇫🇷' },
  { code: 'DE', name: '독일', flag: '🇩🇪' },
  { code: 'TH', name: '태국', flag: '🇹🇭' },
  { code: 'VN', name: '베트남', flag: '🇻🇳' },
  { code: 'SG', name: '싱가포르', flag: '🇸🇬' },
  { code: 'AU', name: '호주', flag: '🇦🇺' },
  { code: 'CA', name: '캐나다', flag: '🇨🇦' },
  { code: 'ES', name: '스페인', flag: '🇪🇸' },
];
