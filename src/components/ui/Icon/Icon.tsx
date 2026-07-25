import { cva } from "class-variance-authority";
import clsx from "clsx";

const iconVariants = cva(
  "material-symbols-outlined select-none",
  {
    variants: {
      color: {
        default: "text-text-base",
        secondary: "text-text-secondary",
        disabled: "text-text-disabled",
        upload: "text-text-upload",
        help: "text-lime-600"
      },
    },
    defaultVariants: {
      color: "default",
    },
  }
);

const fontSizeMap = {
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
  xxl: 80
} as const;

type IconSize = keyof typeof fontSizeMap;

export type IconProps = {
  name: string;
  size?: IconSize;
  filled?: boolean;
  color?: "default" | "secondary" | "disabled" | "upload" | "help";
  className?: string;
};

export function Icon({
  name,
  size = "md",
  filled = false,
  color = "default",
  className,
}: IconProps) {
  const currentSize = fontSizeMap[size];

  return (
    <span
      aria-hidden="true"
      className={clsx(iconVariants({ color }), className)}
      style={{
        fontSize: `${currentSize}px`,
        fontVariationSettings: `
          'FILL' ${filled ? 1 : 0},
          'wght' 400,
          'GRAD' 0,
          'opsz' ${currentSize}
        `,
      }}
    >
      {name}
    </span>
  );
}