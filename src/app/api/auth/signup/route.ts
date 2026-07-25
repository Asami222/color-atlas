// app/api/auth/signup/route.ts
import { NextResponse } from "next/server"
import { db } from "@/libs/db";
import { hash } from "bcryptjs"
import { signupSchema } from "@/libs/validations/authSchema"


export async function POST(req: Request) {
  try {
    const body = await req.json()

    // サーバー側バリデーション
    const result = signupSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues.map((issue) => issue.message).join("\n") },
        { status: 400 }
      )
    }

    const { email, password} = result.data

    const existingUser = await db.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: "すでに登録済みのメールアドレスです" }, { status: 409 })
    }

    const hashedPassword = await hash(password, 10)
    const user = await db.user.create({
      data: { email, password: hashedPassword },
    })

    return NextResponse.json({ user: { id: user.id, email: user.email } },{ status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "ユーザー作成に失敗しました" }, { status: 500 });
  }
}