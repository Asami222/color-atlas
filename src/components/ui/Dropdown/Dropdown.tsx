"use client";

import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import { cva } from "class-variance-authority";
import { Icon } from "../Icon";

export type DropdownOption = {
  value: string;
  label: string;
};

export const dropdownVariants = cva(
  [
    "flex",
    "h-[50px]",
    "w-full",
    "items-center",
    "justify-between",
    "rounded-default",
    "border",
    "px-[12px]",
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
          "bg-background-error",
        ],
        disabled: [
          "cursor-not-allowed",
          "border-border-disabled",
          "bg-background-disabled",
          "opacity-60",
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
  htmlFor?: string;
  emptyText?: string;
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
  htmlFor,
  emptyText = "選択肢がありません",
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
          <Icon name={iconName} />

          <label htmlFor={htmlFor} className="font-medium text-xl">
            {label}

            {required && (
              <span className="ml-1 text-danger">*</span>
            )}
          </label>
        </div>
      )}
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
      <Select.Root
        value={value}
        disabled={disabled || options.length === 0}
        onValueChange={onChange}
      >
        <Select.Trigger
          className={clsx(
            dropdownVariants({ state }),
            className
          )}
        >
          <Select.Value
            placeholder={ options.length === 0 ? emptyText : placeholder}
          />
          <Select.Icon>
            <Icon name="keyboard_arrow_down" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            position="popper"
            sideOffset={4}
            className="
              z-50
              w-(--radix-select-trigger-width)
              overflow-hidden
              rounded-default
              border
              border-border-disabled
              bg-background-secondary
              shadow-lg
            "
          >
            <Select.ScrollUpButton />
            <Select.Viewport className="p-1">
              {options.length === 0 ? (
                <div className="px-3 py-2 text-text-secondary">
                  登録された場所がありません
                </div>
                ) : (
                options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className="
                    relative
                    flex
                    cursor-pointer
                    select-none
                    items-center
                    rounded-default
                    px-3
                    py-2
                    outline-none
                    data-highlighted:bg-primary
                    data-highlighted:text-white
                    data-[state=open]:animate-in
                    data-[state=closed]:animate-out
                  "
                >
                  <Select.ItemText>
                    {option.label}
                  </Select.ItemText>

                  <Select.ItemIndicator className="absolute right-3">
                    <Icon name="check" />
                  </Select.ItemIndicator>
                </Select.Item>
              )
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}