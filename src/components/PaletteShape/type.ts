import { PaletteItem } from "@/store/createPalette";
import { 
  DynamicColorGrid, 
  DynamicHorizontalStripe, 
  DynamicRadial, 
  DynamicColorTriangle, 
  DynamicColorChip
} from "./ShapeStyle";

export type DynamicColorProps = {
  colorData: PaletteItem[];
}

export const shapeMap = {
  column: DynamicHorizontalStripe,
  grid: DynamicColorGrid,
  chips: DynamicColorChip,
  circle: DynamicRadial,
  triangle: DynamicColorTriangle,
} as const;

