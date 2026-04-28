export type ComparisonCountryResult = {
  country: string;
  summary: string;
  highlights: string[];
  lawIds: number[];
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
  id: number;
  code: string;
  name: string;
  flag: string;
};

export type CompareLawRequest = {
  query: string;
  country_id_1: number;
  country_id_2: number;
};

export type CompareLawResponse = {
  success: boolean;
  status: number;
  code: string;
  message: string;
  timestamp: string;
  result: {
    country_1_result: {
      related_law_ids: number[];
      summary: string;
    };
    country_2_result: {
      related_law_ids: number[];
      summary: string;
    };
    compare_summary: {
      common: string;
      diff: string;
    };
  } | null;
};
