import { cva } from "class-variance-authority";
import clsx from "clsx"

const skeletonVariants = cva(
  "animate-pulse rounded-default bg-background-disabled",
  {
    variants: {
      variant: {
        text: "",
        circle: "rounded-full",
      },
      size: {
        sm: "h-4",
        md: "h-6",
        lg: "h-8",
      },
    },
    defaultVariants: {
      variant: "text",
      size: "md",
    },
  }
);

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "text" | "circle";
  size?: "sm" | "md" | "lg";
};

export function Skeleton({
  variant = "text",
  size = "md",
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={clsx(skeletonVariants({ variant, size }), className)}
      {...props}
    />
  );
}