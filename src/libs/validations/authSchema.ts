
import { z } from "zod";

//signup & reset password 共通schema
export const passwordSchema = z
  .string()
  .min(1, { message: "パスワードを入力してください" })
  .min(8, { message: "8文字以上で入力してください" })
  .regex(/[0-9]/, {
    message: "少なくとも1つの数字を含めてください"
  })
  .regex(/[!@#$%^&*(),.?":{}|<>]/, {
    message: "少なくとも1つの記号を含めてください"
  })
  
export const confirmPasswordSchema = z
  .string()
  .min(1, { message: "確認用パスワードを入力してください" })


  
//signup
export const signupSchema = z.object({
  email: z
    .string()
    .min(1, { message: "メールアドレスは必須です" })
    .email({ message: "有効なメールアドレスを入力してください" }),
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
  check: z
    .boolean()
    .refine((value) => value, {
      message: "チェックは必須です",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "パスワードが一致しません",
    })

export type SignupSchema = z.infer<typeof signupSchema>;


//login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("正しいメールアドレスの形式で入力してください"),
  password: z
    .string()
    .min(1, { message: "パスワードを入力してください" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;


//Forgot Password（メール送信用）Schema
export const forgotPasswordRequestSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("正しいメールアドレスの形式で入力してください"),
});

export type ForgotPasswordRequestSchema = z.infer<
  typeof forgotPasswordRequestSchema
>;


//Reset Password（新しい password 設定）Schema
export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
