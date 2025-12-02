export type LawItem = {
  id: number;
  country: string; // e.g. 한국, 미국
  countryCode: string; // e.g. KR, US
  category: string; // e.g. 교통, 노동
  field: string; // filter key e.g. traffic, labor
  title: string;
  subTitle?: string;
  description: string;
  updatedAt: string;
  saved?: boolean;
};

export type LawCardProps = {
  law: LawItem;
  onToggleSave?: (id: number) => void;
};
