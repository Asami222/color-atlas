// app/api/auth/reset-password/route.ts

import { NextResponse } from "next/server";
import { db } from "@/libs/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: "入力が不足しています" },
        { status: 400 }
      );
    }

    // トークン取得
    const resetToken = await db.passwordResetToken.findUnique({
      where: {
        token,
      },
    });

    // トークンが存在しない
    if (!resetToken) {
      return NextResponse.json(
        { message: "トークンが無効です" },
        { status: 400 }
      );
    }

    // 有効期限切れ
    if (resetToken.expiresAt < new Date()) {
      return NextResponse.json(
        { message: "トークンの有効期限が切れています" },
        { status: 400 }
      );
    }

    // パスワード更新
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.$transaction([
      db.user.update({
        where: { id: resetToken.userId },
        data: { password: hashedPassword },
      }),
      db.passwordResetToken.delete({
        where: { token },
      }),
    ]);

    return NextResponse.json({
      message: "パスワードを更新しました",
    });
  } catch {
    return NextResponse.json(
      {
        message: "パスワード更新に失敗しました",
      },
      {
        status: 500,
      }
    );
  }
}