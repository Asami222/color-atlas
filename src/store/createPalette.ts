import { atom } from "jotai";
import type { ShapeType } from "@/components/ui/ShapeButton/ShapeButton";

export type PaletteItem = {
  color: string;
  ratio: number;
};

export type DynamicColorProps = {
  colorData: PaletteItem[];
}

type CreatePaletteState = {
  shape: ShapeType;
  colors: PaletteItem[];
};


export const createPaletteAtom = atom<CreatePaletteState>({
  shape: "grid",
  colors: [],
});