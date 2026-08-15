import type { CreateSchema } from "@/libs/validations/schema";
import type { CreatePaletteState } from "@/store/createPalette";

export type CreatePaletteRequest = CreateSchema & CreatePaletteState;

export type EditPaletteRequest = CreateSchema & CreatePaletteState & { id: string };

export type PaletteRequest = CreatePaletteRequest | EditPaletteRequest;

export type PaletteMutationResult =
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
      code?: string
    };