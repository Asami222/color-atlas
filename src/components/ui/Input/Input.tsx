import { forwardRef } from "react";
import clsx from "clsx"
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  [
    "block w-full p-3",
    "text-text-base",
    "border",
    "rounded-default",
    "placeholder-text-placeholder",

    "focus:outline-2",
    "focus:outline-offset-2",
    "focus:outline-primary",

    "disabled:cursor-not-allowed",
    "disabled:border-border-disabled",
    "disabled:bg-background-disabled",
    "disabled:text-text-disabled",
  ],
  {
    variants: {
      status: {
        default: "border-border-disabled bg-white",
        error: "border-border-error bg-background-error",
      },
    },
    defaultVariants: {
      status: "default",
    },
  }
);

export type InputProps = {
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof inputVariants>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ status, className, ...rest }, ref) => {
  return (
    <input
    ref={ref}
      {...rest}
      className={clsx(inputVariants({ status }), className)}
    />
  )
});

Input.displayName = "Input";