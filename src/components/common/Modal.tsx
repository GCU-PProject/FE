import type { ReactNode, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useCallback, useEffect, useId, useRef } from 'react';
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
  const modalRef = useRef<HTMLDivElement>(null);

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

  const handleOverlayKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (
      event.key === 'Enter' ||
      event.key === ' ' ||
      event.key === 'Spacebar'
    ) {
      event.preventDefault();
      onClose();
    }
  };

  const getFocusableElements = useCallback(() => {
    if (!modalRef.current) return [];
    const selectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([type="hidden"]):not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ];
    return Array.from(
      modalRef.current.querySelectorAll<HTMLElement>(selectors.join(',')),
    ).filter((el) => !el.hasAttribute('data-focus-guard'));
  }, []);

  const focusFirstElement = useCallback(() => {
    const focusables = getFocusableElements();
    if (focusables.length > 0) {
      focusables[0].focus();
      return;
    }
    modalRef.current?.focus();
  }, [getFocusableElements]);

  const handleFocusTrap = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return;

    const focusables = getFocusableElements();
    if (focusables.length === 0) {
      event.preventDefault();
      modalRef.current?.focus();
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;
    const isShift = event.shiftKey;

    if (isShift) {
      if (!active || active === first || !modalRef.current?.contains(active)) {
        event.preventDefault();
        last.focus();
      }
      return;
    }

    if (!active || active === last || !modalRef.current?.contains(active)) {
      event.preventDefault();
      first.focus();
    }
  };

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(focusFirstElement);
    return () => cancelAnimationFrame(id);
  }, [open, focusFirstElement]);

  if (!open || !portalTarget) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
        role="button"
        tabIndex={0}
        aria-label="배경 클릭으로 모달 닫기"
        onKeyDown={handleOverlayKeyDown}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        ref={modalRef}
        className={cn(
          'relative z-10 flex w-full max-h-[90vh] flex-col overflow-hidden rounded-3xl border border-border-base/80 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.18)]',
          widthClass,
          contentClassName,
        )}
        onKeyDown={handleFocusTrap}
      >
        <div
          className={cn(
            'flex items-start gap-4 border-b border-border-base/80 px-6 pb-4 pt-5',
            headerClassName,
          )}
        >
          <div className="flex flex-1 flex-col">
            {title ? (
              <h2
                id={titleId}
                className="text-lg font-semibold text-text-primary"
              >
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-1 text-sm text-text-secondary">{description}</p>
            ) : null}
          </div>

          {(headerActions || showCloseButton) && (
            <div className="flex items-center gap-2">
              {headerActions}
              {showCloseButton ? (
                <button
                  type="button"
                  aria-label="모달 닫기"
                  onClick={onClose}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-text-secondary transition hover:bg-bg-soft"
                >
                  <X
                    className="h-5 w-5 text-text-secondary"
                    strokeWidth={2.2}
                  />
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
