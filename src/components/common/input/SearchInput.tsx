import { InputHTMLAttributes, ReactNode, forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  action?: ReactNode;
  helperText?: string;
  inputClassName?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ action, helperText, className, inputClassName, id, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const helperId = helperText ? `${inputId}-helper` : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <div
          className={cn(
            'group flex min-h-9 w-full items-center gap-3 rounded-lg bg-bg-soft px-4 ring-1 ring-inset ring-transparent transition-colors focus-within:ring-2 focus-within:ring-[#C7D9FF] focus-within:ring-offset-0',
            className,
          )}
        >
          <input
            ref={ref}
            id={inputId}
            aria-describedby={helperId}
            className={cn(
              'flex-1 bg-transparent text-base text-text-primary placeholder:text-text-placeholder focus-visible:outline-none',
              inputClassName,
            )}
            {...props}
          />
          {action ? <div className="flex-shrink-0">{action}</div> : null}
        </div>
        {helperText ? (
          <p id={helperId} className="text-sm text-text-tertiary">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

SearchInput.displayName = 'SearchInput';
