"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPlaceSchema, type NewPlaceSchema } from "@/libs/validations/schema";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { createPlace } from "./action";
import { Dialog } from "@/components/ui/Dialog/Dialog";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation"
import { useEffect } from "react";
import { LoginRequiredDialog } from "./LoginRequiredDialog"

export type Place = {
  id: string;
  name: string;
};

export interface CreatePlaceFormProps {
  onCreated: (place: Place) => void
  onOpenChange: (open: boolean) => void
  onBeforeLogin: (placeName: string) => void
  open: boolean
  isLoading?: boolean;
}

export function CreatePlaceForm({ open, onOpenChange, onCreated, onBeforeLogin, isLoading }: CreatePlaceFormProps) {

const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    setError,
    formState: { errors, isValid },
  } = useForm<NewPlaceSchema>({
    resolver: zodResolver(newPlaceSchema),
    mode: "onChange",
  })

  const router = useRouter();
  const queryClient = useQueryClient();
  //const value = getValues("text");
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: createPlace,
    onSuccess: async (result) => {
      if (!result.success) {
        if (result.message === "ログインが必要です") {
          setLoginDialogOpen(true);
          //sessionStorage.setItem("pending-place",value);
          //router.push("/login?callbackUrl=/create");
          return;
      }
      setError("text", {
        type: "server",
        message: result.message,
      });
      return;
      }
      await queryClient.invalidateQueries({
        queryKey: ["places"],
      });

      onCreated(result.place);

      reset();
      onOpenChange(false);
    },
    onError: (error) => {
      setError("root", {
        type: "server",
        message:
          error instanceof Error
            ? error.message
            : "予期しないエラーが発生しました。",
      });
    },
  });

  const isDisabled = isLoading || mutation.isPending;

  const onCancel = () => {
    onOpenChange(false);
  }

  const onSubmit = (data: NewPlaceSchema) => {
    mutation.mutate(data.text);
  }

  const handleLogin = () => {
    //console.log("save", getValues("text"));
    onBeforeLogin(getValues("text"));

    router.push("/auth/login?callbackUrl=/create");
  };

  const handleSignup = () => {
    onBeforeLogin(getValues("text"));

    router.push("/auth/signup?callbackUrl=/create");
  };

  return (
    <>
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="新しい場所"
      description="場所またはカテゴリーを追加します"
      footer={
        <>
          <Button
            type="button"
            size="Small"
            variant="Outline"
            onClick={onCancel}
            disabled={isDisabled}
          >
            キャンセル
          </Button>

          <Button
            type="button"
            size="Small"
            loading={mutation.isPending}
            loadingText="送信中..."
            disabled={isDisabled}
            onClick={handleSubmit(onSubmit)}
          >
            追加
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.root && (
          <p className="text-text-error text-sm text-center my-2">
            {errors.root.message}
          </p>
        )}
      <Input 
        id="text"
        type="text"
        placeholder="富士市"
        {...register("text")}
        status={errors.text ? "error" : "default"}
      />
      {errors.text && (
        <p className="text-sm text-text-error mt-2 text-center">
          {errors.text.message}
        </p>
      )}
      </form>
    </Dialog>
    <LoginRequiredDialog 
      open={loginDialogOpen}
      onOpenChange={setLoginDialogOpen}
      onLogin={handleLogin}
      onSignup={handleSignup}
    />
    </>
  );
}