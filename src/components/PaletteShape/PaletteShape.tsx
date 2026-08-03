import { shapeMap } from "./type";
import { PaletteItem } from "@/store/createPalette";

export type PaletteShapeProps = {
  shape: keyof typeof shapeMap;
  colors: PaletteItem[];
}

export function PaletteShape({ shape, colors }: PaletteShapeProps) {
  const ShapeComponent = shapeMap[shape];
  return (
          <ShapeComponent colorData={colors} />
        )
}