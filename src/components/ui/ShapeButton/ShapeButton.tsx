import { cva } from "class-variance-authority";
import Image from "next/image";
import React from "react";

const shapeButtonVariants = cva([
  "w-[72px] h-[72px] flex items-center justify-center rounded-default p-2",
  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-200",
  "hover:cursor-pointer"
  ],
  {
    variants: {
      selected: {
        true: "bg-primary",
        false: "hover:bg-primary-hover",
      },
    },
     defaultVariants: {
      selected: false,
    },
  }
);

const ShapeMap = {
  grid: {
    default: "/svg/grid.svg",
    selected: "/svg/grid-active.svg",
    alt: "グリッド表示",
    width: 52,
    height: 48
  },
  chips: {
    default: "/svg/chips.svg",
    selected: "/svg/chips-active.svg",
    alt: "チップ表示",
    width: 38,
    height: 48
  },
  column: {
    default: "/svg/column.svg",
    selected: "/svg/column-active.svg",
    alt: "カラム表示",
    width: 52,
    height: 40
  },
  circle: {
    default: "/svg/circle.svg",
    selected: "/svg/circle-active.svg",
    alt: "円表示",
    width: 52,
    height: 52
  },
  triangle: {
    default: "/svg/diagonal.svg",
    selected: "/svg/diagonal-active.svg",
    alt: "斜線表示",
    width: 52,
    height: 48
  }
} as const

export type ShapeType = keyof typeof ShapeMap;

export interface ShapeButtonProps {
  selectedShape: ShapeType;
  onShapeChange: (shape: ShapeType) => void;
}

export function ShapeButton({ selectedShape, onShapeChange }: ShapeButtonProps) {

  //const [selectedShape, setSelectedShape] = React.useState<keyof typeof ShapeMap>("grid");

  return (
    <div role="radiogroup" aria-label="パレットの表示形式" className="w-70 md:w-122 grid grid-cols-3 md:grid-cols-5 gap-x-8 gap-y-10 items-center">
     {(["grid", "chips", "column", "circle", "triangle"] as const).map((shape) => (
    <button
      key={shape}
      type="button"
      role="radio"
      aria-checked={selectedShape === shape}
      onClick={() => onShapeChange(shape)}
      className={shapeButtonVariants({ selected: selectedShape === shape, })}
    >
      <Image 
        src={ selectedShape === shape ? ShapeMap[shape].selected : ShapeMap[shape].default }
        alt={shape}
        aria-hidden="true"
        width={ShapeMap[shape].width}
        height={ShapeMap[shape].height}
      />
      <span className="sr-only">
        { ShapeMap[shape].alt }
      </span>
    </button>
      ))}
    </div>
  );

}