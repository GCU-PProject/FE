import { SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface DropdownSelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label: string;
  helperText?: string;
}

export function DropdownSelect({
  label,
  helperText,
  className,
  children,
  ...props
}: DropdownSelectProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-[#0A0A0A]">{label}</span>
      <div className="relative">
        <select
          className={cn(
            'h-10 w-full appearance-none rounded-lg bg-[#F3F3F5] px-4 pr-10 text-base text-[#0A0A0A] placeholder:text-[#717182] ring-1 ring-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7D9FF]',
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#717182]"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 7.5 10 12.5 15 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {helperText ? (
        <span className="text-xs text-[#99A1AF]">{helperText}</span>
      ) : null}
    </label>
  );
}
