import { cva } from "class-variance-authority";
import Image from "next/image";

const shapeButtonVariants = cva([
  "w-[72px] h-[72px] flex items-center justify-center rounded-default p-2",
  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-200",
  ],
  {
    variants: {
      selected: {
        true: "bg-primary",
        false: "bg-background-secondary hover:bg-primary-hover",
      },
    },
     defaultVariants: {
      selected: false,
    },
  }
);


const ShapeMap = {
  grid: {
    default: "/grid.svg",
    selected: "/grid-active.svg",
  },
  chips: {
    default: "/chips.svg",
    selected: "/chips-active.svg"
  },
  column: {
    default: "/oneColumn.svg",
    selected: "/oneColumn-active.svg",
  }
} as const


export type ShapeButtonProps = {
  shape?: "grid" | "chips" | "column";
  selected?: boolean;
  label: string;
  onClick?: () => void;
};

export function ShapeButton({
  shape = "grid",
  selected = false,
  label,
  onClick,
}: ShapeButtonProps) {

  const Icon = ShapeMap[shape];
  console.log(Icon);

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={shapeButtonVariants({ selected })}
    >
      <Image 
        src={ selected? Icon.selected : Icon.default }
        alt={shape}
        width={52}
        height={48}
      />
    </button>
  );

}