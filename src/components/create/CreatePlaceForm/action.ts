"use server";

import { auth } from "@/libs/auth";
import { db } from "@/libs/db";
import { newPlaceSchema } from "@/libs/validations/schema";
import type { Place } from "./CreatePlaceForm";

type CreatePlaceResult =
  | {
      success: true;
      place: Place;
    }
  | {
      success: false;
      message: string;
      code?: string;
      place?: Place
    };

export async function createPlace(text: string): Promise<CreatePlaceResult>{

  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      code: "UNAUTHORIZED",
      message: "ログインが必要です"
    };
  }

  const userId = session.user.id;

  // Server側でも必ずバリデーション
  const result = newPlaceSchema.safeParse({ text });

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0]?.message,
    };
  }

  const name = result.data.text.trim();

  // 重複チェック
  const exists = await db.place.findUnique({
    where: {
      userId_name: {
      userId,
      name,
    },
    },
  });

  if (exists) {
    return {
      success: false,
      message: "その場所は既に登録されています",
      place: exists
    };
  }

  const place = await db.place.create({
    data: {
      userId,
      name,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return {
    success: true,
    place,
  };
}