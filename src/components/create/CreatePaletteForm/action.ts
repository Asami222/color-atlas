// src/components/ColorAtlas/CreateColorAtlasForm/action.ts
"use server";

import { auth } from "@/libs/auth";
import { db } from "@/libs/db";
import { ShapeType } from "@prisma/client";
import type { CreatePaletteRequest } from "./CreatePaletteForm";
import { createSchema } from "@/libs/validations/schema";
import { revalidatePath } from "next/cache";

type CreatePaletteResult =
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
      code?: string
    };

export async function createColor(
  data: CreatePaletteRequest,
) : Promise<CreatePaletteResult>{
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      code: "UNAUTHORIZED",
      message: "ログインが必要です"
    };
  }

  if (data.colors.length === 0) {
    return {
      success: false,
      code: "UNAUTHORIZED",
      message: "カラー情報がありません。ホームへ戻りカラーを作成してください。"
    };
  }

  const parsed = createSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message,
    };
  }

  const values = parsed.data;

  await db.palette.create({
    data: {
      userId: session.user.id,
      placeId: values.placeId,
      memo: values.memo || null,
      shape: data.shape as ShapeType,
      colors: data.colors,
      captureDate:
        values.isDateEnabled && values.date
          ? values.date
          : null,
    },
  });

  revalidatePath("/");

  return {
    success: true,
  };
}