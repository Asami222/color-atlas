// app/api/auth/guest-logout/route.ts
import { NextResponse } from "next/server"
import { db } from "@/libs/db"

export async function POST(req: Request) {
  const { email } = await req.json()
  if (email?.startsWith("guest-")) {
    await db.user.delete({ where: { email } })
  }
  return NextResponse.json({ success: true })
}