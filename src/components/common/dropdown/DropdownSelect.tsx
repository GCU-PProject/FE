import { SelectHTMLAttributes, forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';
import { ReactComponent as ChevronDownIcon } from '@/assets/icons/chevron-down.svg';

interface DropdownSelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label: string;
  helperText?: string;
}

export const DropdownSelect = forwardRef<
  HTMLSelectElement,
  DropdownSelectProps
>(({ label, helperText, className, children, id, ...props }, ref) => {
  const autoId = useId();
  const selectId = id ?? autoId;
  const helperId = helperText ? `${selectId}-helper` : undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={selectId} className="text-sm font-medium text-[#0A0A0A]">
        {label}
      </label>
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          {...(helperId ? { 'aria-describedby': helperId } : {})}
          className={cn(
            'h-10 w-full appearance-none rounded-lg bg-[#F3F3F5] px-4 pr-10 text-base text-[#0A0A0A] ring-1 ring-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7D9FF]',
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#717182]"
        />
      </div>
      {helperText ? (
        <span id={helperId} className="text-xs text-[#99A1AF]">
          {helperText}
        </span>
      ) : null}
    </div>
  );
});

DropdownSelect.displayName = 'DropdownSelect';
