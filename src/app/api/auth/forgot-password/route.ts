import { db } from "@/libs/db"
import { sendResetPasswordEmail } from "@/libs/mail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
try {
  const {email} = await req.json()
  // ① ユーザーを検索
  const user = await db.user.findUnique({
    where: { email },
  });

  // 存在しなくても同じレスポンスを返す
  if (!user) {
  return NextResponse.json({
    message: "登録されている場合、パスワード再設定メールを送信しました",
  });
}

  // ② ランダムトークン生成
  const token = crypto.randomUUID();
  
  //既存のトークンを削除
  await db.passwordResetToken.deleteMany({
    where: {
      userId: user.id,
    },
  });

  // ③ DBへ保存
  await db.passwordResetToken.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 30), // 30分
    },
  });

  // ④ メール送信
  await sendResetPasswordEmail(user.email, token);

  return NextResponse.json({
      message: "登録されている場合、パスワード再設定メールを送信しました",
    });
    } catch {
    return NextResponse.json(
      {
        message: "パスワード再設定メールの送信に失敗しました",
      },
      {
        status: 500,
      }
    );
  }
}