"use client";

import { SignupForm, type SignupMethod } from "@/components/auth/SignupForm";
import { type SignupSchema } from "@/libs/validations/authSchema";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from 'sonner';

export function SignupFormContainer() {

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/"; // 前のページまたはホーム
  const [loadingMethod, setLoadingMethod] = useState<SignupMethod>(null);

  const [submitError, setSubmitError] = useState<string | undefined>()

  const handleSignup = async (data: SignupSchema) => {
    setSubmitError(undefined)
    try {
      setLoadingMethod("credential");
     const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "登録に失敗しました");
        return;
      }

      // 自動ログイン
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl,
      });
    } catch(err: unknown) {
      if(err instanceof Error) {
          if (err.message.includes("security purposes")) {
            setSubmitError("少し時間をおいてから再度お試しください");
          } else {
            setSubmitError(err.message)
          }
      }
    } finally {
      setLoadingMethod(null);
    }
  }

   //googleログイン
   const handleGoogleLogin = async () => {
    setSubmitError(undefined)
    try {
      setLoadingMethod("google");
      await signIn("google", {
        redirect: true,
        callbackUrl, // 前のページに戻る
      });
    } catch (err) {
      if (err instanceof Error) {
        setSubmitError(err.message)
      } 
    } finally {
      setLoadingMethod(null);
    }
  }

  //GitHubログイン
   const handleGitHubLogin = async () => {
    setSubmitError(undefined)
    try {
      setLoadingMethod("github");
      await signIn("github", {
        redirect: true,
        callbackUrl, // 前のページに戻る
      });
    } catch (err) {
      if (err instanceof Error) {
        setSubmitError(err.message)
      } 
    } finally {
      setLoadingMethod(null);
    }
  }

  return <SignupForm onSignup={handleSignup} loadingMethod={loadingMethod} submitError={submitError} onGoogleLogin={handleGoogleLogin} onGitHubLogin={handleGitHubLogin}/>
  
}
