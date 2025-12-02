import type { ReactNode } from 'react';
import { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

let scrollLockCount = 0;
let previousBodyOverflow: string | undefined;

type ModalProps = {
  /** 표시 여부 */
  open: boolean;
  /** 모달 상단 제목 */
  title?: string;
  /** 제목 하단의 간략한 설명 */
  description?: string;
  /** 바깥 영역 클릭 또는 닫기 버튼 클릭 시 호출 */
  onClose: () => void;
  /** 모달 내부 콘텐츠 */
  children: ReactNode;
  /** 푸터 영역 (버튼 등을 배치) */
  footer?: ReactNode;
  /** 헤더 우측에 액션(버튼 등) 추가 */
  headerActions?: ReactNode;
  /** 가로 폭 커스텀 */
  widthClass?: string;
  /** 본문 영역에 추가할 클래스 */
  bodyClassName?: string;
  /** 헤더 영역에 추가할 클래스 */
  headerClassName?: string;
  /** 푸터 영역에 추가할 클래스 */
  footerClassName?: string;
  /** 전체 모달 컨테이너 클래스 */
  contentClassName?: string;
  /** 푸터를 스크롤 영역 하단에 고정 */
  footerSticky?: boolean;
  /** 닫기 버튼 노출 여부 */
  showCloseButton?: boolean;
};

/** 공통 오버레이 모달 컴포넌트 */
export function Modal({
  open,
  title,
  description,
  onClose,
  children,
  footer,
  headerActions,
  widthClass = 'max-w-4xl',
  bodyClassName,
  headerClassName,
  footerClassName,
  contentClassName,
  footerSticky = false,
  showCloseButton = true,
}: ModalProps) {
  const titleId = useId();
  const portalTarget =
    typeof document !== 'undefined' ? document.body : undefined;

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    scrollLockCount += 1;
    if (scrollLockCount === 1) {
      previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      scrollLockCount = Math.max(0, scrollLockCount - 1);
      if (scrollLockCount === 0 && previousBodyOverflow !== undefined) {
        document.body.style.overflow = previousBodyOverflow;
        previousBodyOverflow = undefined;
      }
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open || !portalTarget) {
    return null;
  }

  return createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6'>
      <div
        className='absolute inset-0 bg-black/40 backdrop-blur-[2px]'
        onClick={onClose}
      />

      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby={title ? titleId : undefined}
        className={cn(
          'relative z-10 flex w-full max-h-[90vh] flex-col overflow-hidden rounded-3xl border border-border-base/80 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.18)]',
          widthClass,
          contentClassName,
        )}
      >
        <div
          className={cn(
            'flex items-start gap-4 border-b border-border-base/80 px-6 pb-4 pt-5',
            headerClassName,
          )}
        >
          <div className='flex flex-1 flex-col'>
            {title ? (
              <h2
                id={titleId}
                className='text-lg font-semibold text-text-primary'
              >
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className='mt-1 text-sm text-text-secondary'>{description}</p>
            ) : null}
          </div>

          {(headerActions || showCloseButton) && (
            <div className='flex items-center gap-2'>
              {headerActions}
              {showCloseButton ? (
                <button
                  type='button'
                  aria-label='모달 닫기'
                  onClick={onClose}
                  className='inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-text-secondary transition hover:bg-bg-soft'
                >
                  <X className='h-5 w-5' stroke='#4A5565' strokeWidth={2.2} />
                </button>
              ) : null}
            </div>
          )}
        </div>

        <div
          className={cn(
            'flex flex-1 flex-col overflow-y-auto px-6 pb-6 pt-4',
            bodyClassName,
          )}
        >
          {children}
        </div>

        {footer ? (
          <div
            className={cn(
              'border-t border-border-base/80 bg-white px-6 py-4',
              footerSticky && 'sticky bottom-0 left-0',
              footerClassName,
            )}
          >
            {footer}
          </div>
        ) : null}
      </div>
    </div>,
    portalTarget,
  );
}

export default Modal;
