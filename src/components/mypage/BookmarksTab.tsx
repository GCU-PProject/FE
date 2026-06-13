import { ExternalLink, Trash2 } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import type { LawItem } from '@/types/law';

type BookmarksTabProps = {
  bookmarks: LawItem[];
  onView: (law: LawItem) => void;
  onDelete: (id: number) => void;
};

export const BookmarksTab = ({
  bookmarks,
  onView,
  onDelete,
}: BookmarksTabProps) => (
  <div className="space-y-3">
    {bookmarks.map((item) => (
      <Card
        key={item.id}
        className="rounded-2xl border-border-subtle bg-white px-5 py-4 shadow-sm sm:px-6"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="min-w-[48px] justify-center px-3"
              >
                {item.country}
              </Badge>
              <Badge variant="tag" className="min-w-[48px] justify-center px-3">
                {item.category}
              </Badge>
            </div>
            <h3 className="text-lg font-semibold leading-tight text-text-primary">
              {item.title}
              {item.subTitle ? (
                <span className="ml-2 text-base font-normal text-text-secondary">
                  ({item.subTitle})
                </span>
              ) : null}
            </h3>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => onView(item)}
              className="inline-flex h-[34px] items-center justify-center gap-2 rounded-md border border-border-base px-3 text-sm font-semibold text-text-primary transition hover:border-border-selected"
              aria-label="법률 상세 보기"
            >
              <ExternalLink className="h-4 w-4" />
              보기
            </button>
            <button
              type="button"
              onClick={() => onDelete(item.id)}
              className="inline-flex h-[34px] items-center justify-center rounded-md px-3 text-sm font-semibold text-danger-base transition hover:bg-danger-surface"
              aria-label="북마크 삭제"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Card>
    ))}

    {bookmarks.length === 0 ? (
      <Card className="rounded-lg border-border-subtle bg-white px-5 py-10 text-center text-text-secondary shadow-sm">
        저장한 북마크가 없습니다.
      </Card>
    ) : null}
  </div>
);

export default BookmarksTab;
