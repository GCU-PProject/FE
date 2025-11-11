import { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  action?: ReactNode;
  helperText?: string;
  inputClassName?: string;
}

export function SearchInput({
  action,
  helperText,
  className,
  inputClassName,
  ...props
}: SearchInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={cn(
          'group flex min-h-[36px] w-full items-center gap-3 rounded-lg bg-[#F3F3F5] px-4 ring-1 ring-inset ring-transparent transition-colors focus-within:ring-2 focus-within:ring-[#C7D9FF] focus-within:ring-offset-0',
          className,
        )}
      >
        <input
          className={cn(
            'flex-1 bg-transparent text-base text-[#111322] placeholder:text-[#717182] focus-visible:outline-none',
            inputClassName,
          )}
          {...props}
        />
        {action ? <div className="flex-shrink-0">{action}</div> : null}
      </div>
      {helperText ? (
        <p className="text-sm text-[#99A1AF]">{helperText}</p>
      ) : null}
    </div>
  );
}
