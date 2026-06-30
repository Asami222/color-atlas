import clsx from "clsx";
import { Icon } from "../Icon/Icon";
import { cva } from "class-variance-authority";
import type { ReactNode } from "react";

const checkboxVariants = cva(
  "flex h-6 w-6 items-center justify-center rounded border-2",
  {
    variants: {
      checked: {
        true: "",
        false: "",
      },
      disabled: {
        true: "",
        false: "",
      },
      error: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        checked: false,
        error: false,
        disabled: false,
        className: "border-border-default bg-transparent",
      },
      {
        checked: true,
        className: "border-primary bg-primary",
      },
      {
        error: true,
        className: "border-border-error text-text-error",
      },
      {
        disabled: true,
        className: "border-border-disabled bg-background-disabled",
      },
    ],
  }
);

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
  > & {
  label: ReactNode;
  error?: boolean;
};

export function Checkbox({
  label,
  checked = false,
  disabled = false,
  error = false,
  required = false,
  ...props
}: CheckboxProps) {
  return (
    <label
      className={clsx(
        "flex items-center gap-2",
        disabled && "cursor-not-allowed",
        !disabled && "cursor-pointer"
      )}
    >
      <input
        type="checkbox"
        {...props}
        className="sr-only"
      />

      <span className={ checkboxVariants({checked,disabled,error}) }>
        {checked && (
          <Icon
            name="check"
            size="sm"
            color="secondary"
            filled
          />
        )}
      </span>

      <span
        className={clsx(
          "text-text-base text-sm",
          disabled && "text-text-disabled"
        )}
      >
        {label}
        {required && (
        <span className="ml-1 text-text-error">*</span>
        )}
      </span>
    </label>
  );
}