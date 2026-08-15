"use server";

import type { EditPaletteRequest, PaletteMutationResult } from "@/types/palette";
import { auth } from "@/libs/auth";
import { db } from "@/libs/db";


export async function editColor(data: EditPaletteRequest) : Promise<PaletteMutationResult>{
  const session = await auth();

  if (!session) {
    return {
      success: false,
      code: "UNAUTHORIZED",
      message: "ログインが必要です",
    };
  }

  // paletteの所有者も確認する
  const palette = await db.palette.findFirst({
    where: {
      id: data.id,
      userId: session.user.id,
    },
  });

  if (!palette) {
    return {
      success: false,
      code: "NOT_FOUND",
      message: "パレットが見つかりません",
    };
  }

  await db.palette.update({
    where: {
      id: data.id,
    },
    data: {
      placeId: data.placeId,
      memo: data.memo,
      captureDate: data.isDateEnabled ? data.date : null,
      hasTime: data.isDateEnabled ? data.hasTime : false,
      shape: data.shape,
      colors: data.colors,
    },
  });

  return {
    success: true,
  };
}