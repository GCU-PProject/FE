export type LawItem = {
  id: number;
  country: string; // 한국, 미국
  countryCode: string; // KR, US
  category: string; // 교통, 노동
  field: string; // filter key (traffic, labor)
  title: string;
  subTitle?: string;
  description: string;
  updatedAt: string;
  saved?: boolean;
  sourceUrl?: string;
  detailSections?: LawDetailSection[];
};

export type LawCardProps = {
  law: LawItem;
  onToggleSave?: (id: number) => void;
  onViewDetail?: (law: LawItem) => void;
};

export type LawDetailSection = {
  id: string;
  title: string;
  content: string;
  bullets?: string[];
};
