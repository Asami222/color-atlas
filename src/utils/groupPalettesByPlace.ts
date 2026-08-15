
import type { PaletteUIModel } from "./transform";

type GroupedPaletteMap = Record<
  string,
  {
    placeName: string;
    palettes: PaletteUIModel[];
  }
>;

export type GroupedPalette = {
  placeId: string;
  placeName: string;
  palettes: PaletteUIModel[];
};

export function groupPalettesByPlace(palettes: PaletteUIModel[],): GroupedPalette[] {
  const grouped = palettes.reduce<GroupedPaletteMap>((acc, palette) => {
    const placeId = palette.place.id;

    if (!acc[placeId]) {
      acc[placeId] = {
        placeName: palette.place.name,
        palettes: [],
      };
    }

    acc[placeId].palettes.push(palette);

    return acc;
  }, {});

  return Object.entries(grouped).map(([placeId, group]) => ({
    placeId,
    placeName: group.placeName,
    palettes: group.palettes,
  }));
}