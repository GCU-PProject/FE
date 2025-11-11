import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './buttonVariants';
import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
