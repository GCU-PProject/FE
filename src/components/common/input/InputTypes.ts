import { InputHTMLAttributes } from 'react';
import { VariantProps } from 'class-variance-authority';
import { inputVariants } from './inputVariants';

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}
