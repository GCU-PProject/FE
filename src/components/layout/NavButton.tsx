import { cn } from '@/lib/utils';
import { HeaderNavItem } from './types';

type NavButtonProps = {
  item: HeaderNavItem;
  isActive: boolean;
  onSelect: () => void;
  className?: string;
};

// 네비 항목을 한 곳에서 스타일 관리하기 위한 버튼 컴포넌트
export function NavButton({
  item,
  isActive,
  onSelect,
  className,
}: NavButtonProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
    className={cn(
      'flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-bg-soft',
      isActive
        ? 'bg-brand-light text-brand-primary'
        : 'text-text-secondary hover:text-text-primary',
      className,
    )}
  >
      {item.icon ? (
        <span className={cn('text-current', isActive && 'text-brand-primary')}>
          {item.icon}
        </span>
      ) : null}
      <span>{item.label}</span>
    </button>
  );
}
