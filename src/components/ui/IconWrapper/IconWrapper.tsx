import Link from "next/link";
import { Icon } from "../Icon";
import { cva } from "class-variance-authority";

const iconWrapperVariants = cva([
  "flex items-center justify-center rounded-default p-2 hover:bg-primary-hover",
  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-200",
  ],
  {
    variants: {
      variant: {
        default: "",
        sub: "",
      },
      active: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        active: false,
        class: "bg-transparent",
      },
      { variant: "default",
        active: true,
        class: "bg-neutral-950",
      },
      {
        variant: "sub",
        active: false,
        class: "bg-background-secondary border border-border-disabled",
      },
      {
        variant: "sub",
        active: true,
        class: "bg-background-third",
      },
    ],
  }
);

type IconWrapperProps = {
  icon: string;
  label: string;
  variant?: "default" | "sub";
  active?: boolean;
};

export type IconButtonProps = IconWrapperProps & { onClick?: () => void }
export type IconLinkProps = IconWrapperProps & { href: string }

export function IconButton({
  icon,
  label,
  variant = "default",
  active = false,
  onClick,
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={iconWrapperVariants({ variant, active })}
    >
      <Icon name={icon} color={active ? "secondary" : "default"}/>
    </button>
  );
}


export function IconLink({
  href,
  icon,
  label,
  variant = "default",
  active = false,
}: IconLinkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={iconWrapperVariants({ variant, active })}
    >
      <Icon name={icon} color={active ? "secondary" : "default"}/>
    </Link>
  );
}