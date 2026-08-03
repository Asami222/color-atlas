"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"
import { LoginForm, type LoginMethod } from "./LoginForm";
import { signIn } from "next-auth/react";
import { toast } from 'sonner';


export function LoginFormContainer() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const [loadingMethod, setLoadingMethod] = useState<LoginMethod>(null);
  const [submitError, setSubmitError] = useState<string | undefined>()

  // name と password でログイン
  const handleLogin = async (email: string, password: string) => {
    setSubmitError(undefined)
    try {
      setLoadingMethod("credential");
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // 自動リダイレクトを無効化
        callbackUrl,
      })
      if (result?.ok && result.url) {
      router.replace(result.url) // ログイン成功後に 前のページまたはホーム へ
      router.refresh();
    } else {
      toast.error(result.error || "ログインに失敗しました");
    }
    } catch(err: unknown) {
      if(err instanceof Error) {
        setSubmitError(err.message)
      }
    } finally {
     setLoadingMethod(null);
    }
  }

   //googleでログイン
  const handleGoogleLogin = async () => {
    setSubmitError(undefined)
    try {
      setLoadingMethod("google");
      await signIn("google", {
        redirect: true,
        callbackUrl 
      })
      
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

  // ゲストでログイン
const handleGuestLogin = async () => {
  setSubmitError(undefined);

  try {
    setLoadingMethod("guest");

    const res = await fetch("/api/auth/guest-login", {
      method: "POST",
    });

    const { email, password } = await res.json();

    if (!res.ok) {
      throw new Error("ゲストログインに失敗しました");
    }

    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl,
    });
  } catch (err) {
    if (err instanceof Error) {
      setSubmitError(err.message);
    }
  } finally {
    setLoadingMethod(null);
  }
};

  return <LoginForm onLogin={handleLogin} onGuestLogin={handleGuestLogin} loadingMethod={loadingMethod} submitError={submitError} onGoogleLogin={handleGoogleLogin} onGitHubLogin={handleGitHubLogin}/>
  
}
