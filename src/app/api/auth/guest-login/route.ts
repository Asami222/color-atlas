// app/api/auth/guest-login/route.ts
import { NextResponse } from "next/server"
import { db } from "@/libs/db"
import { hash } from "bcryptjs"
import { randomUUID } from "crypto"

export async function POST() {
  const guestEmail = `guest-${randomUUID()}@example.com`
  const guestPassword = randomUUID()
  const hashedPassword = await hash(guestPassword, 10)

  await db.user.create({
    data: {
      email: guestEmail,
      password: hashedPassword,
      isGuest: true,
    },
  })

  return NextResponse.json({
    email: guestEmail,
    password: guestPassword,
  })
}