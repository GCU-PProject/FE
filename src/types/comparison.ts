export type CompareLawRequest = {
  query: string;
  country_id_1: number;
  country_id_2: number;
};

export type CompareLawCountryResult = {
  related_law_ids: number[];
  summary: string;
};

export type CompareLawSummary = {
  common: string;
  diff: string;
};

export type CompareLawResult = {
  country_1_result: CompareLawCountryResult;
  country_2_result: CompareLawCountryResult;
  compare_summary: CompareLawSummary;
};

export type CompareLawApiResponse = {
  success: boolean;
  status: number;
  code: string;
  message: string;
  timestamp: string;
  result: CompareLawResult | null;
};

export type ComparisonCountryResult = {
  country: string;
  summary: string;
  relatedLawIds: number[];
};

export type ComparisonAnalysis = {
  common: string;
  diff: string;
};

export type ComparisonResult = {
  country1: ComparisonCountryResult;
  country2: ComparisonCountryResult;
  comparison: ComparisonAnalysis;
};

export type CountryOption = {
  id: number;
  code: string;
  name: string;
  flag: string;
};
