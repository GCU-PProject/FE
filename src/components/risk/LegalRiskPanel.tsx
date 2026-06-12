import { FormEvent, useMemo, useState } from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/common/button/Button';
import { Card } from '@/components/common/Card';
import { DropdownSelect } from '@/components/common/dropdown/DropdownSelect';
import { Input } from '@/components/common/input/Input';
import { useLegalRisk } from '@/hooks/useLegalRisk';
import type {
  AgeBand,
  LegalRiskRequest,
  RiskLevel,
  TravelPurpose,
  VisaType,
} from '@/types/legalRisk';

type RiskFormState = {
  countryId: string;
  travelPurpose: '' | TravelPurpose;
  visaType: '' | VisaType;
  age: string;
};

const riskLevelLabel: Record<RiskLevel, string> = {
  LOW: '낮음',
  MEDIUM: '보통',
  HIGH: '높음',
};

const riskLevelClassName: Record<RiskLevel, string> = {
  LOW: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  MEDIUM: 'border-amber-200 bg-amber-50 text-amber-700',
  HIGH: 'border-rose-200 bg-rose-50 text-rose-700',
};

const countries = [
  { id: 1, label: '미국 (연방)' },
  { id: 2, label: '미국 - 캘리포니아' },
  { id: 3, label: '미국 - 뉴욕' },
  { id: 4, label: '캐나다 (연방)' },
  { id: 5, label: '캐나다 - 온타리오' },
  { id: 6, label: '캐나다 - 브리티시컬럼비아' },
  { id: 7, label: '호주 (연방)' },
  { id: 8, label: '호주 - 뉴사우스웨일스' },
  { id: 9, label: '호주 - 퀸즐랜드' },
  { id: 10, label: '호주 - 서호주' },
  { id: 11, label: '호주 - 남호주' },
  { id: 12, label: '호주 - 태즈메이니아' },
  { id: 13, label: '호주 - 노퍽 섬' },
];

const normalizeIssueUrl = (url: string) => url.replace(/^<|>$/g, '');

const isSafeHttpUrl = (url: string) => {
  try {
    const parsedUrl = new URL(normalizeIssueUrl(url));
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
};

const getAgeBand = (age: number): AgeBand => {
  if (age < 20) return '10s';
  if (age < 30) return '20s';
  if (age < 40) return '30s';
  if (age < 50) return '40s';
  return '50s_plus';
};

export const LegalRiskPanel = () => {
  const [form, setForm] = useState<RiskFormState>({
    countryId: '',
    travelPurpose: '',
    visaType: '',
    age: '',
  });
  const [validationMessage, setValidationMessage] = useState('');
  const { data, error, isLoading, requestLegalRisk } = useLegalRisk();

  const canSubmit = useMemo(() => {
    const age = Number(form.age);
    return (
      form.countryId !== '' &&
      form.travelPurpose !== '' &&
      form.visaType !== '' &&
      Number.isFinite(age) &&
      age > 0
    );
  }, [form]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    if (!canSubmit) {
      setValidationMessage('체류 정보를 모두 입력해주세요.');
      return;
    }

    setValidationMessage('');

    const payload: LegalRiskRequest = {
      country_id: Number(form.countryId),
      travel_purpose: form.travelPurpose as TravelPurpose,
      visa_type: form.visaType as VisaType,
      age_band: getAgeBand(Number(form.age)),
    };

    void requestLegalRisk(payload);
  };

  return (
    <div className="mx-auto max-w-[1280px]">
      <Card className="rounded-lg border-border-soft bg-white p-7 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <DropdownSelect
            label="체류국가"
            value={form.countryId}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, countryId: event.target.value }))
            }
            className="h-10 bg-gray-50"
          >
            <option value="">체류국가를 선택하세요</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.label}
              </option>
            ))}
          </DropdownSelect>

          <DropdownSelect
            label="체류목적"
            value={form.travelPurpose}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                travelPurpose: event.target.value as TravelPurpose,
              }))
            }
            className="h-10 bg-gray-50"
          >
            <option value="">체류목적을 선택하세요</option>
            <option value="tourism">관광</option>
            <option value="business">출장/비즈니스</option>
            <option value="study">유학</option>
            <option value="work">취업</option>
            <option value="working_holiday">워킹홀리데이</option>
          </DropdownSelect>

          <DropdownSelect
            label="비자 유형"
            value={form.visaType}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                visaType: event.target.value as VisaType,
              }))
            }
            className="h-10 bg-gray-50"
          >
            <option value="">비자 유형을 선택하세요</option>
            <option value="short_stay">단기 체류</option>
            <option value="long_stay">장기 체류</option>
            <option value="work_permit">취업 허가</option>
            <option value="student_visa">학생 비자</option>
          </DropdownSelect>

          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor="risk-age"
              className="text-sm font-medium text-text-primary"
            >
              연령
            </label>
            <Input
              id="risk-age"
              type="number"
              min={1}
              placeholder="연령을 입력하세요"
              value={form.age}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, age: event.target.value }))
              }
              className="h-11 bg-gray-50"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="h-11 w-full gap-2 bg-[#9ea4f3] text-base hover:bg-[#8f96ee]"
          >
            <AlertTriangle className="h-4 w-4" />
            {isLoading ? '위험 지수 분석 중' : '위험 지수 분석하기'}
          </Button>
        </form>

        {validationMessage ? (
          <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            {validationMessage}
          </div>
        ) : null}

        {error ? (
          <div className="mt-4 flex items-start gap-2 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error.message}</span>
          </div>
        ) : null}
      </Card>

      {data ? (
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-text-secondary">
              종합 위험 지수
            </span>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                riskLevelClassName[data.overall_risk_level]
              }`}
            >
              {riskLevelLabel[data.overall_risk_level]}
            </span>
          </div>

          {data.risk_list.map((risk) => {
            const issueRefs = (risk.issue_refs ?? []).filter((issue) =>
              isSafeHttpUrl(issue.url),
            );

            return (
              <Card key={risk.risk_title} className="bg-white p-5">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold text-text-primary">
                    {risk.risk_title}
                  </h3>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      riskLevelClassName[risk.risk_level]
                    }`}
                  >
                    {riskLevelLabel[risk.risk_level]}
                  </span>
                </div>

                <p className="text-sm leading-6 text-text-secondary">
                  {risk.risk_content}
                </p>

                {risk.risk_actions.length > 0 ? (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-text-primary">
                      권장 조치
                    </p>
                    <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-text-secondary">
                      {risk.risk_actions.map((action) => (
                        <li key={action}>{action}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {risk.law_refs.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-text-secondary">
                    {risk.law_refs.map((law) => (
                      <span
                        key={`${law.law_id}-${law.article_no}`}
                        className="rounded-md border border-border-soft px-2 py-1"
                      >
                        {law.law_type} {law.article_no}
                      </span>
                    ))}
                  </div>
                ) : null}

                {issueRefs.length > 0 ? (
                  <div className="mt-3 space-y-1">
                    {issueRefs.map((issue) => (
                      <a
                        key={issue.issue_id}
                        href={normalizeIssueUrl(issue.url)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-sm text-brand-primary hover:underline"
                      >
                        {issue.title}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                ) : null}
              </Card>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
