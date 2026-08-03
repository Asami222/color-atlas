import type { Palette } from "@prisma/client";
import type { PaletteItem } from "@/store/createPalette";
import type{ ShapeType } from "@/components/ui/ShapeButton/ShapeButton";

export type PaletteUIModel = {
  id: string;
  placeId: string;
  memo?: string;
  shape: ShapeType;
  colors: PaletteItem[]; 
  captureDate?: string;
  createdAt: string;
}

export function toPaletteUI(palette: Palette): PaletteUIModel {
  return {
    id: palette.id,
    placeId: palette.placeId,
    memo: palette.memo ?? undefined,
    shape: palette.shape,
    colors: palette.colors as PaletteItem[],
    captureDate: palette.captureDate?.toISOString(), // DateのままだとJSON化で崩れやすい
    createdAt: palette.createdAt.toISOString(), // DateのままだとJSON化で崩れやすい
  };
}

export function toPalettesUI(palettes: Palette[]): PaletteUIModel[] {
  return palettes.map(toPaletteUI);
}