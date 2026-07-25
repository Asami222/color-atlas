import type { Metadata } from "next";
import { ResetPasswordClient } from "./client";
import { createMetadata } from "@/libs/metadata";

export const metadata: Metadata = createMetadata({
  title: "パスワード再作成",
  description: "新しいパスワードを作成します",
  path: "/auth/reset-password",
});

const ForgotPassword = () => {

  return <ResetPasswordClient />
         
}

export default ForgotPassword
