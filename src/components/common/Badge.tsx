import type { BadgeProps } from '@/types/news';

export const Badge = ({
  variant = 'default',
  className = '',
  children,
}: BadgeProps) => {
  const baseClasses =
    'inline-flex items-center rounded-full border px-2.5 py-0.5 ' +
    'text-xs font-semibold transition-colors focus:outline-none ' +
    'focus:ring-2 focus:ring-ring focus:ring-offset-2';

  let variantClasses = '';

  switch (variant) {
    case 'secondary':
      // 디자인 토큰 사용
      variantClasses = 'border-transparent bg-secondary text-secondary-strong';
      break;
    case 'tag':
      variantClasses = 'border-transparent bg-surface-tag text-text-primary';
      break;
    case 'outline':
      variantClasses = 'border-border-subtle text-secondary';
      break;
    default:
      variantClasses = 'border-transparent bg-brand-primary text-on-brand';
      break;
  }

  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};
