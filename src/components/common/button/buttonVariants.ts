import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  // 공통 스타일
  'inline-flex items-center justify-center font-medium rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',

  // variant & size 정의
  {
    variants: {
      variant: {
        primary:
          'bg-[#0053F4] text-white hover:bg-[#0043C2] focus:ring-[#0053F4]',
        outline:
          'border border-[#0053F4] text-[#0053F4] bg-transparent hover:bg-[#EBF1FF]',
        destructive:
          'bg-[#D92D20] text-white hover:bg-[#B42318] focus:ring-[#D92D20]',
        link: 'text-[#0053F4] underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);
