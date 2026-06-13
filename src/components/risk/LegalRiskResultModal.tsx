import { ExternalLink } from 'lucide-react';
import { Modal } from '@/components/common/Modal';
import type { LegalRiskResult, RiskLevel } from '@/types/legalRisk';

type LegalRiskResultModalProps = {
  open: boolean;
  onClose: () => void;
  result: LegalRiskResult | null;
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

const normalizeIssueUrl = (url: string) => url.replace(/^<|>$/g, '');

const isSafeHttpUrl = (url: string) => {
  try {
    const parsedUrl = new URL(normalizeIssueUrl(url));
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
};

export const LegalRiskResultModal = ({
  open,
  onClose,
  result,
}: LegalRiskResultModalProps) => {
  if (!result) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="위험 지수 분석 결과"
      description="입력하신 체류 조건 기준으로 확인된 주요 법률 리스크입니다."
      widthClass="max-w-[760px]"
    >
      <div className="space-y-5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-text-secondary">
            종합 위험 지수
          </span>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${
              riskLevelClassName[result.overall_risk_level]
            }`}
          >
            {riskLevelLabel[result.overall_risk_level]}
          </span>
        </div>

        <div className="space-y-4">
          {result.risk_list.map((risk) => {
            const issueRefs = (risk.issue_refs ?? []).filter((issue) =>
              isSafeHttpUrl(issue.url),
            );

            return (
              <section
                key={risk.risk_title}
                className="rounded-lg border border-border-soft bg-white p-4"
              >
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
                        key={`${law.law_id ?? 'unknown'}-${law.article_no}`}
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
              </section>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default LegalRiskResultModal;
