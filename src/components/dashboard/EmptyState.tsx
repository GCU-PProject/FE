import { Newspaper } from 'lucide-react';
import { Card } from '@/components/common/Card';
import type { EmptyStateProps } from '@/types/news';

export const EmptyState = ({ message }: EmptyStateProps) => (
  <Card className='p-8 sm:p-10 text-center border-dashed border-2 border-border-subtle bg-surface-subtle'>
    <Newspaper className='w-10 h-10 sm:w-12 sm:h-12 text-secondary mx-auto mb-4' />
    <p className='text-base sm:text-lg font-medium text-secondary-strong'>
      {message}
    </p>
  </Card>
);
