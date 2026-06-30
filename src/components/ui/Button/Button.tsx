import clsx from "clsx"
import { Spinner } from "../Spinner/Spinner"
import { cva } from "class-variance-authority";

const buttonVariants = cva([
  "flex items-center justify-center font-medium text-center px-4 py-2 leading-loose transition-all duration-300 rounded-default enabled:cursor-pointer enabled:hover:transition-all enabled:hover:duration-100",
  "disabled:cursor-not-allowed",
  "focus:outline-2 focus:outline-offset-2 focus:outline-primary",
  ],
  {
    variants: {
      variant: {
        Solid: "bg-primary enabled:hover:bg-primary-hover-dark text-secondary disabled:bg-disabled disabled:text-text-disabled",
        Outline: "bg-secondary enabled:hover:text-primary text-text-base border border-border-default disabled:text-text-disabled disabled:border-border-disabled disabled:bg-secondary",
        Text: "bg-none text-text-base enabled:hover:text-primary disabled:bg-none disabled:text-text-disabled"
      },
      size: {
        Small: "min-w-24 text-base font-medium",
        Medium: "h-12.5 min-w-34 text-xl"
      },
      error: {
        true: "",
        false: ""
      }
    },
    compoundVariants: [
      {
        variant: "Solid",
        error: true,
        class: "bg-red-100 text-text-error"
      },
      {
        variant: "Outline",
        error: true,
        class: "border border-danger text-text-error"
      },
      {
        variant: "Text",
        error: true,
        class: "text-text-error"
      }
    ],
    defaultVariants: {
      variant: "Solid",
      size: "Medium",
      error: false,
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &{
  variant?: "Solid" | "Outline" | "Text";
  size?: "Small" | "Medium";
  error?: boolean;
  loading?: boolean;
  loadingText?: string 
};

export function Button({
  variant = "Solid",
  size = "Medium",
  error = false,
  loading = false,
  loadingText,
  children,
  className,
  ...props
}: ButtonProps) {
  
  return (
    <button
      disabled={props.disabled || loading}
      className={clsx(
        buttonVariants({ variant, size, error }),
        className
      )}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-1 h-full w-full">
          <Spinner size={16} color={variant === "Text" || variant === "Outline" ? "var(--icon-disabled)" : "var(--white)"}/>
          <span>{loadingText ?? children}</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}