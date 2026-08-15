import type { Palette } from "@prisma/client";
import type { PaletteItem } from "@/store/createPalette";
import type{ ShapeType } from "@/components/ui/ShapeButton/ShapeButton";

type PaletteWithPlace = Palette & {
  place: {
    id: string;
    name: string;
  };
};

export type PaletteUIModel = {
  id: string;
  memo?: string;
  shape: ShapeType;
  colors: PaletteItem[]; 
  captureDate?: string;
  hasTime: boolean;
  createdAt: string;
  place: {
    id: string;
    name: string;
  };
}

export function toPaletteUI(palette: PaletteWithPlace): PaletteUIModel {
  return {
    id: palette.id,
    memo: palette.memo ?? undefined,
    shape: palette.shape,
    colors: palette.colors as PaletteItem[],
    hasTime: palette.hasTime,
    captureDate: palette.captureDate?.toISOString(), // DateのままだとJSON化で崩れやすい
    createdAt: palette.createdAt.toISOString(), // DateのままだとJSON化で崩れやすい
    place: {
      id: palette.place.id,
      name: palette.place.name,
    },
  };
}

export function toPalettesUI(palettes: PaletteWithPlace[]): PaletteUIModel[] {
  return palettes.map(toPaletteUI);
}