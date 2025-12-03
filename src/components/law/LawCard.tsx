import { Bookmark, Calendar, ChevronRight } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import type { LawCardProps } from '@/types/law';

export const LawCard = ({ law, onToggleSave, onViewDetail }: LawCardProps) => {
  const isSaved = Boolean(law.saved);

  return (
    <Card className="min-h-[192px] w-full rounded-2xl border-border-subtle bg-white px-5 py-5 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:px-6">
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{law.country}</Badge>
            <Badge variant="tag">{law.category}</Badge>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-semibold text-text-primary leading-tight">
            {law.title}
            {law.subTitle ? (
              <span className="ml-1 text-base font-normal text-text-secondary italic">
                ({law.subTitle})
              </span>
            ) : null}
          </h3>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            {law.description}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-text-tertiary">
            <Calendar className="h-4 w-4 text-text-tertiary" />
            <span>최종 업데이트:</span>
            <span className="text-text-tertiary">{law.updatedAt}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => onToggleSave?.(law.id)}
              className="inline-flex h-[32px] min-w-[92px] items-center justify-center gap-1 rounded-md px-3 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-soft"
            >
              {isSaved ? (
                <Bookmark
                  className="h-4 w-4 text-brand-primary"
                  fill="currentColor"
                />
              ) : (
                <Bookmark className="h-4 w-4 text-text-secondary" />
              )}
              <span className={isSaved ? 'text-brand-primary' : ''}>
                {isSaved ? '저장됨' : '저장'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => onViewDetail?.(law)}
              className="inline-flex h-[32px] w-[104px] items-center justify-center gap-1.5 rounded-md border border-border-base px-3 text-sm font-medium text-text-primary transition-colors hover:border-border-selected"
            >
              상세보기
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LawCard;
