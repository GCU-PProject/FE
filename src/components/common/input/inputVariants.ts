import { cva } from 'class-variance-authority';

export const inputVariants = cva(
  'flex w-full rounded-lg bg-bg-soft text-text-primary placeholder:text-text-placeholder ring-1 ring-inset ring-border-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      controlSize: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-11 px-5 text-lg',
      },
      state: {
        default: '',
        error:
          'ring-danger-base focus-visible:ring-danger-base focus-visible:ring-offset-0',
        success:
          'ring-border-selected focus-visible:ring-border-selected focus-visible:ring-offset-0',
      },
    },
    defaultVariants: {
      controlSize: 'md',
      state: 'default',
    },
  },
);
