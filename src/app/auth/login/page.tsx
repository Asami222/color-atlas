import type { Metadata } from "next";
import { createMetadata } from "@/libs/metadata";
import { LoginFormContainer } from "@/components/auth/LoginForm/LoginFormContainer";

export const metadata: Metadata = createMetadata({
  title: "ログイン",
  description: "ログインページです。アカウントをお持ちでない方は新規登録へお進みください",
  path: "/auth/login",
});

export default function LoginForm() {
  return <LoginFormContainer />
}