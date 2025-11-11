import { cva } from 'class-variance-authority';

export const inputVariants = cva(
  'flex w-full rounded-lg bg-[#F3F3F5] text-[#111322] placeholder:text-[#717182] ring-1 ring-inset ring-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7D9FF] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      controlSize: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-9 px-4 text-base',
        lg: 'h-11 px-5 text-lg',
      },
      state: {
        default: '',
        error:
          'ring-[#D92D20] focus-visible:ring-[#D92D20] focus-visible:ring-offset-0',
        success:
          'ring-[#12B76A] focus-visible:ring-[#12B76A] focus-visible:ring-offset-0',
      },
    },
    defaultVariants: {
      controlSize: 'md',
      state: 'default',
    },
  },
);
