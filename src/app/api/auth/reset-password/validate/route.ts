// app/api/auth/reset-password/validate/route.ts

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/libs/db";

// トークン確認API
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { valid: false },
      { status: 400 }
    );
  }

  const resetToken = await db.passwordResetToken.findUnique({
    where: {
      token,
    },
  });

  if (!resetToken) {
    return NextResponse.json({
      valid: false,
    });
  }

  if (resetToken.expiresAt < new Date()) {
    return NextResponse.json({
      valid: false,
    });
  }

  return NextResponse.json({
    valid: true,
  });
}