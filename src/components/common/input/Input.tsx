import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { inputVariants } from './inputVariants';
import type { InputProps } from './InputTypes';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, controlSize, state, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputVariants({ controlSize, state, className }))}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
