"use client";

import { ResetPasswordForm } from "./ResetPasswordForm";
import { useState } from "react";

type ResetResult = { message: string };

interface ResetPasswordFormContainerProps {
  token: string;
  onReset: (err?: Error, result?: ResetResult) => void
}

export function ResetPasswordFormContainer ({
  onReset,
  token
}: ResetPasswordFormContainerProps) {

  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | undefined>()

  const handleClick = async (password: string) => {
    if (!token) {
      setSubmitError("無効なURLです");
      return;
    }
    setSubmitError(undefined)
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });
      const result: ResetResult = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      onReset?.(undefined, result) //成功時は err なし、result あり
    } catch(err: unknown) {
      if(err instanceof Error) {
        setSubmitError(err.message)
        onReset?.(err) //失敗時は err のみ渡す
      }
    } finally {
      setIsLoading(false)
    }
  }

  return <ResetPasswordForm onClick={handleClick} isLoading={isLoading} submitError={submitError}/>
  
}
