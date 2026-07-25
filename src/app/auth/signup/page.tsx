import type { Metadata } from "next";
import { createMetadata } from "@/libs/metadata";
import { SignupFormContainer } from "@/components/auth/SignupForm/SignupFormContainer";

export const metadata: Metadata = createMetadata({
  title: "新規登録",
  description: "アカウント作成ページです",
  path: "/auth/signup",
});

export default function SignUpPage() {
  return <SignupFormContainer />
}