import { ShapeType } from "@/components/ui/ShapeButton/ShapeButton";
import { PaletteItem } from "@/store/createPalette";


export type PendingCreateData = {
  palette: {
    shape: ShapeType;
    colors: PaletteItem[];
  };
  placeName?: string;
};