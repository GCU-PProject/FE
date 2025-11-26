import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  // 공통 스타일
  'inline-flex items-center justify-center font-medium rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',

  // variant & size 정의
  {
    variants: {
      variant: {
        primary:
          'bg-brand-primary text-white hover:brightness-95 focus:ring-brand-primary',
        outline:
          'border border-brand-primary text-brand-primary bg-transparent hover:bg-brand-light',
        destructive:
          'bg-danger-base text-white hover:brightness-90 focus:ring-danger-base',
        link: 'text-brand-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-11 px-5 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);
