import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const textareaVariants = cva(
  [
    "w-full min-h-32 box-border px-4 py-3 text-base rounded-default border resize-none transition-colors",
    "placeholder:text-text-placeholder",

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

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textareaVariants>

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      status,
      className,
      ...props
    },
    ref
  ) => {
    //const currentState = disabled ? "disabled" : state;

    return (
      <div className="flex flex-col gap-1">
        <textarea
          ref={ref}
          className={clsx(
            textareaVariants({
              status
            }),
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";