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

export type CompareLawRequest = {
  country1: string;
  country2: string;
  topic: string;
};

export type CompareLawApiResponse = {
  success: boolean;
  status: number;
  code: string;
  message: string;
  timestamp: string;
  result: ComparisonResult | null;
};

export type CountryOption = {
  code: string;
  name: string;
  flag: string;
};
