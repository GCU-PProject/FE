import { Bookmark, ExternalLink, X } from 'lucide-react';
import { Modal } from '@/components/common/Modal';
import { Badge } from '@/components/common/Badge';
import type { LawItem } from '@/types/law';

type LawDetailModalProps = {
  open: boolean;
  law?: LawItem | null;
  onClose: () => void;
  onToggleSave?: (id: number) => void;
};

export const LawDetailModal = ({
  open,
  law,
  onClose,
  onToggleSave,
}: LawDetailModalProps) => {
  if (!open || !law) return null;
  const isSaved = Boolean(law.saved);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={undefined}
      aria-label={law.title}
      widthClass="max-w-[720px]"
      contentClassName="rounded-2xl"
      headerClassName="border-none px-6 pt-4 pb-0 justify-between items-center"
      bodyClassName="px-6 pb-6 pt-0 space-y-4"
      showCloseButton={false}
      headerActions={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleSave?.(law.id)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-text-secondary transition hover:text-brand-primary"
            aria-label={isSaved ? '저장 해제' : '저장'}
          >
            <Bookmark
              className={
                isSaved
                  ? 'h-5 w-5 text-brand-primary'
                  : 'h-5 w-5 text-text-tertiary'
              }
              strokeWidth={2.1}
              fill={isSaved ? 'currentColor' : 'none'}
            />
          </button>
          <button
            type="button"
            aria-label="모달 닫기"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-text-secondary transition hover:bg-bg-soft"
          >
            <X className="h-5 w-5"></X>
          </button>
        </div>
      }
    >
      <div className="flex w-full items-start gap-3">
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="h-[22px] min-w-[42px] justify-center px-3"
            >
              {law.country}
            </Badge>
            <Badge
              variant="tag"
              className="h-[22px] min-w-[42px] justify-center px-3"
            >
              {law.category}
            </Badge>
          </div>

          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-[24px] font-bold leading-[32px] text-text-primary">
                {law.title}
                {law.subTitle ? (
                  <span className="ml-2 text-base font-normal text-text-secondary">
                    ({law.subTitle})
                  </span>
                ) : null}
              </h1>
              <p className="mt-1 text-sm text-text-tertiary">
                최종 업데이트: {law.updatedAt}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-1 rounded-xl border border-border-base/70 bg-white p-4 text-sm text-text-secondary">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-semibold text-text-primary">원문 출처</div>
            <p className="mt-1 text-text-tertiary">
              공식 법령 사이트에서 전문을 확인하세요
            </p>
          </div>
          {law.sourceUrl ? (
            <a
              href={law.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border-base px-4 text-sm font-semibold text-text-primary transition hover:border-border-selected"
            >
              <ExternalLink className="h-4 w-4 text-text-secondary" />
              <span className="text-text-primary">원문 보기</span>
            </a>
          ) : null}
        </div>
      </div>

      <div className="space-y-3">
        {law.detailSections?.map((section) => (
          <article
            key={section.id}
            className="rounded-2xl border border-border-base bg-white px-5 py-4 shadow-[0px_8px_20px_rgba(15,23,42,0.04)]"
          >
            <div className="mb-2 flex items-center gap-3">
              <Badge
                variant="tag"
                className="h-[28px] min-w-[60px] justify-center rounded-md border-transparent bg-brand-surface px-3 text-brand-primary"
              >
                제{section.id}조
              </Badge>
              <h3 className="text-base font-semibold text-text-primary">
                {section.title}
              </h3>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {section.content}
            </p>
            {section.bullets && section.bullets.length > 0 ? (
              <ul className="mt-2 space-y-1 text-sm text-text-secondary">
                {section.bullets.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[6px] h-1 w-1 rounded-full bg-text-tertiary" />
                    <span className="flex-1 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </Modal>
  );
};

export default LawDetailModal;
