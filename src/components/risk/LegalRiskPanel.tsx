import { FormEvent, useState } from 'react';
import { AlertTriangle, ExternalLink, ShieldCheck } from 'lucide-react';
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

const normalizeIssueUrl = (url: string) => url.replace(/^<|>$/g, '');

export const LegalRiskPanel = () => {
  const [form, setForm] = useState<LegalRiskRequest>({
    country_id: 1,
    travel_purpose: 'tourism',
    visa_type: 'short_stay',
    age_band: '20s',
  });
  const { data, error, isLoading, requestLegalRisk } = useLegalRisk();

  const updateForm = <K extends keyof LegalRiskRequest>(
    key: K,
    value: LegalRiskRequest[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void requestLegalRisk(form);
  };

  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-4xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-md bg-brand-light p-2 text-brand-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              여행 법률 리스크 조회
            </h2>
            <p className="text-sm text-text-secondary">
              국가, 방문 목적, 비자, 연령대를 기준으로 주요 리스크를 확인합니다.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_1fr_auto]"
        >
          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor="legal-risk-country"
              className="text-sm font-medium text-text-primary"
            >
              국가 ID
            </label>
            <Input
              id="legal-risk-country"
              type="number"
              min={1}
              value={form.country_id}
              onChange={(event) =>
                updateForm('country_id', Number(event.target.value))
              }
              className="h-10"
            />
          </div>

          <DropdownSelect
            label="방문 목적"
            value={form.travel_purpose}
            onChange={(event) =>
              updateForm('travel_purpose', event.target.value as TravelPurpose)
            }
          >
            <option value="tourism">관광</option>
            <option value="business">비즈니스</option>
            <option value="study">유학</option>
            <option value="work">취업</option>
            <option value="other">기타</option>
          </DropdownSelect>

          <DropdownSelect
            label="비자 유형"
            value={form.visa_type}
            onChange={(event) =>
              updateForm('visa_type', event.target.value as VisaType)
            }
          >
            <option value="short_stay">단기 체류</option>
            <option value="long_stay">장기 체류</option>
            <option value="visa_free">무비자</option>
            <option value="student">학생 비자</option>
            <option value="work">취업 비자</option>
            <option value="other">기타</option>
          </DropdownSelect>

          <DropdownSelect
            label="연령대"
            value={form.age_band}
            onChange={(event) =>
              updateForm('age_band', event.target.value as AgeBand)
            }
          >
            <option value="10s">10대</option>
            <option value="20s">20대</option>
            <option value="30s">30대</option>
            <option value="40s">40대</option>
            <option value="50s">50대</option>
            <option value="60s_plus">60대 이상</option>
          </DropdownSelect>

          <Button type="submit" disabled={isLoading} className="self-end">
            {isLoading ? '조회 중' : '조회'}
          </Button>
        </form>

        {error ? (
          <div className="mt-4 flex items-start gap-2 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error.message}</span>
          </div>
        ) : null}

        {data ? (
          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-text-secondary">
                종합 리스크
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
              const issueRefs = risk.issue_refs ?? [];

              return (
                <Card key={risk.risk_title} className="p-4">
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
    </section>
  );
};
