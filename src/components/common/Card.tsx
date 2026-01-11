import type { CardProps } from '@/types/news';

export const Card = ({ className = '', children, style }: CardProps) => (
  <div
    className={`rounded-lg border bg-surface text-primary shadow-sm ${className}`}
    style={style}
  >
    {children}
  </div>
);
