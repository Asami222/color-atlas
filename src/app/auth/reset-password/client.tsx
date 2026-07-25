"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ExpiredResetLink } from "@/components/auth/ResetPasswordForm/ExpiredResetLink";
import { ResetPasswordFormContainer } from "@/components/auth/ResetPasswordForm/ResetPasswordForm/ResetPasswordFormContainer";


export function ResetPasswordClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [checking, setChecking] = useState(true);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        setExpired(true);
        setChecking(false);
        return;
      }

      const res = await fetch(
        `/api/auth/reset-password/validate?token=${token}`
      );

      const result = await res.json();

      setExpired(!result.valid);
      setChecking(false);
    };

    checkToken();
  }, [token]);

  if (checking) {
    return null;
  }

  if (expired) {

    return <ExpiredResetLink />;
  }

  const handleReset = async (err?: Error) => {
    if (err) return;

    toast.success(
      "パスワードを変更しました。新しいパスワードでログインしてください"
    );

    router.replace("/auth/login");
  };

  return <ResetPasswordFormContainer token={token!} onReset={handleReset} />
   
};