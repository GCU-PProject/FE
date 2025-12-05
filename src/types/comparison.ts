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
