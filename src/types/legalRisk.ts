export type TravelPurpose =
  | 'tourism'
  | 'business'
  | 'study'
  | 'work'
  | 'working_holiday';

export type VisaType =
  | 'short_stay'
  | 'long_stay'
  | 'work_permit'
  | 'student_visa';

export type AgeBand = '10s' | '20s' | '30s' | '40s' | '50s_plus';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type LegalRiskRequest = {
  country_id: number;
  travel_purpose: TravelPurpose;
  visa_type: VisaType;
  age_band: AgeBand;
};

export type LawReference = {
  law_id: number | null;
  law_type: string;
  article_no: string;
};

export type IssueReference = {
  issue_id: number;
  title: string;
  url: string;
  published_date: string;
};

export type LegalRiskItem = {
  risk_title: string;
  risk_level: RiskLevel;
  risk_content: string;
  risk_actions: string[];
  law_refs: LawReference[];
  issue_refs?: IssueReference[];
};

export type LegalRiskResult = {
  country_id: number;
  overall_risk_level: RiskLevel;
  risk_list: LegalRiskItem[];
};

export type ApiResponse<T> = {
  success: boolean;
  status: number;
  code: string;
  message: string;
  timestamp: string;
  result: T;
};

export type ApiErrorResponse = ApiResponse<null>;
