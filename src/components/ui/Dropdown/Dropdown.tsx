import clsx from "clsx";
import { Icon } from "../Icon";

export type DropdownOption = {
  value: string;
  label: string;
};

import { cva } from "class-variance-authority";

export const dropdownVariants = cva(
  [
    "w-full h-[50px]",
    "rounded-default",
    "border",
    "px-[12px]",
    "py-[12px]",
    "text-base",
    "outline-none",
    "transition-colors",
  ],
  {
    variants: {
      state: {
        default: [
          "border-border-disabled",
          "bg-background-secondary",
        ],

        error: [
          "border-border-error",
          "bg-background-error"
        ],

        disabled: [
          "cursor-not-allowed",
          "border-border-disabled",
          "bg-background-disabled",
        ],
      },
    },

    defaultVariants: {
      state: "default",
    },
  }
);

export type DropdownProps = {
  label?: string;
  iconName: "landscape_2" | "calendar_month" | "schedule";
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  error?: boolean;
  required?: boolean;

  onChange?: (value: string) => void;

  className?: string;
};

export function Dropdown({
  label,
  iconName = "landscape_2",
  options,
  value,
  placeholder,
  helperText,
  disabled,
  error,
  required,
  onChange,
  className,
}: DropdownProps) {
  const state =
    disabled
      ? "disabled"
      : error
        ? "error"
        : "default";

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <div className="flex items-center gap-1">
          <Icon name={iconName}/>
          <label className="font-medium text-xl">
            {label}

            {required && (
              <span className="ml-1 text-danger">
                *
              </span>
            )}
          </label>
        </div>
      )}

      <select
        value={value}
        disabled={disabled}
        onChange={(e) =>
          onChange?.(e.target.value)
        }
        className={clsx(
          dropdownVariants({ state }),
          className
        )}
      >
        {placeholder && (
          <option value="" className="">
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {helperText && (
        <p
          className={clsx(
            "text-xs",
            error && "text-text-error"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}


