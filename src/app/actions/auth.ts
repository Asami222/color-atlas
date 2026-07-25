// src/app/actions/auth.ts
"use server"; // ファイル全体を Server Actions として定義

import { signOut } from "@/libs/auth";

export async function handleLogout() {
  await signOut({ redirectTo: "/" });
}