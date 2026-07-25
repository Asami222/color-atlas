"use client";

import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { useState } from "react";
import { toast } from 'sonner';

export function ForgotPasswordContainer() {

  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | undefined>()
  const [sent, setSent] = useState(false);

  const handleClick = async (email: string) => {
    if (sent) return;
    setSubmitError(undefined)
    try {
      if (email.startsWith("guest-") && email.endsWith("@example.com")) {
        throw new Error("ゲストユーザーはパスワードを再設定できません");
      }  
      setIsLoading(true)
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      toast.success(result.message);
      setSent(true);
    } catch(err: unknown) {
      if(err instanceof Error) {
        setSubmitError(err.message)
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false)
    }
  }

  return <ForgotPasswordForm onClick={handleClick} isLoading={isLoading} submitError={submitError} sent={sent}/>
  
}
