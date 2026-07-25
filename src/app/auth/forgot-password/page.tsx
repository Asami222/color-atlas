import type { Metadata } from "next";
import { ForgotPasswordContainer } from "@/components/auth/ForgotPasswordForm/ForgotPasswordFormContainer";
import { createMetadata } from "@/libs/metadata";

export const metadata: Metadata = createMetadata({
  title: "パスワード再発行",
  description: "入力メールアドレスにパスワード再設定メールを送信します",
  path: "/auth/forgot-password",
});

const ForgotPassword = () => {

  return <ForgotPasswordContainer />
         
}

export default ForgotPassword
