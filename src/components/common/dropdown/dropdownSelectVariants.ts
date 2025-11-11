import { cva } from 'class-variance-authority';

export const dropdownSelectVariants = cva(
  'w-full appearance-none rounded-lg bg-[#F3F3F5] text-[#0A0A0A] ring-1 ring-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7D9FF]',
  {
    variants: {
      size: {
        sm: 'h-8 px-3 pr-8 text-sm',
        md: 'h-10 px-4 pr-10 text-base',
        lg: 'h-11 px-5 pr-12 text-lg',
      },
      variant: {
        default: '',
        outline:
          'bg-white ring-[#E5E7EB] focus-visible:ring-[#C7D9FF] focus-visible:ring-offset-0',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  },
);
