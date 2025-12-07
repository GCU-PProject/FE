import { ExternalLink, Trash2 } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import type { CompareSet } from '@/types/mypage';

type CompareTabProps = {
  compareSets: CompareSet[];
  onRevisit: (set: CompareSet) => void;
  onDelete: (id: number) => void;
};

export const CompareTab = ({
  compareSets,
  onRevisit,
  onDelete,
}: CompareTabProps) => (
  <div className="space-y-3">
    {compareSets.map((setItem) => (
      <Card
        key={setItem.id}
        className="rounded-2xl border-border-subtle bg-white px-5 py-4 shadow-sm sm:px-6"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-text-primary leading-tight">
              {setItem.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              {setItem.countries.map((code) => (
                <Badge
                  key={code}
                  variant="outline"
                  className="min-w-[44px] justify-center px-3 uppercase"
                >
                  {code}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => onRevisit(setItem)}
              className="inline-flex h-[34px] items-center justify-center gap-2 rounded-md border border-border-base px-3 text-sm font-semibold text-text-primary transition hover:border-border-selected"
            >
              <ExternalLink className="h-4 w-4" />
              다시 보기
            </button>
            <button
              type="button"
              onClick={() => onDelete(setItem.id)}
              className="inline-flex h-[34px] items-center justify-center rounded-md px-3 text-sm font-semibold text-danger-base transition hover:bg-danger-surface"
              aria-label="비교 조합 삭제"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Card>
    ))}

    {compareSets.length === 0 ? (
      <Card className="rounded-lg border-border-subtle bg-white px-5 py-10 text-center text-text-secondary shadow-sm">
        저장된 비교 조합이 없습니다. 법률 비교에서 국가를 선택해 비교를 시작해 보세요.
      </Card>
    ) : null}
  </div>
);

export default CompareTab;
