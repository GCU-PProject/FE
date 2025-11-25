import { SelectHTMLAttributes, forwardRef, useId } from 'react';
import { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ReactComponent as ChevronDownIcon } from '@/assets/icons/chevron-down.svg';
import { dropdownSelectVariants } from './dropdownSelectVariants';

interface DropdownSelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof dropdownSelectVariants> {
  label: string;
  helperText?: string;
}

export const DropdownSelect = forwardRef<
  HTMLSelectElement,
  DropdownSelectProps
>(
  (
    { label, helperText, className, children, id, size, variant, ...props },
    ref,
  ) => {
    const autoId = useId();
    const selectId = id ?? autoId;
    const helperId = helperText ? `${selectId}-helper` : undefined;
    const currentSize = size ?? 'md';
    const iconOffset =
      currentSize === 'lg'
        ? 'right-4'
        : currentSize === 'sm'
          ? 'right-2.5'
          : 'right-3';

    return (
      <div className="flex w-full flex-col gap-2">
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-[#0A0A0A]"
        >
          {label}
        </label>
        <div className="relative w-full">
          <select
            ref={ref}
            id={selectId}
            {...(helperId ? { 'aria-describedby': helperId } : {})}
            className={cn(dropdownSelectVariants({ size, variant }), className)}
            {...props}
          >
            {children}
          </select>
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#717182] z-10',
              iconOffset,
            )}
          >
            <ChevronDownIcon className="h-16 w-16" />
          </span>
        </div>
        {helperText ? (
          <span id={helperId} className="text-xs text-[#99A1AF]">
            {helperText}
          </span>
        ) : null}
      </div>
    );
  },
);

DropdownSelect.displayName = 'DropdownSelect';
