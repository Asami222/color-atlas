import { z } from "zod";

//signup
export const signupSchema = z.object({
  email: z
    .string()
    .min(1, { message: "メールアドレスは必須です" })
    .email({ message: "有効なメールアドレスを入力してください" }),
  password: z
    .string()
    .min(1, { message: "パスワードは必須です" })
    .min(8, { message: "パスワードは8文字以上で入力してください" })
    .regex(/[0-9]/, "少なくとも1つの数字を含めてください")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "少なくとも1つの記号を含めてください"),
  confirmPassword: z
    .string()
    .min(1, { message: "確認用パスワードは必須です" }),
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


//Reset Password（メール送信用）Schema
export const resetPasswordRequestSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("正しいメールアドレスの形式で入力してください"),
});

export type ResetPasswordRequestSchema = z.infer<
  typeof resetPasswordRequestSchema
>;


//Reset Password（新しい password 設定）Schema
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "パスワードは8文字以上で入力してください"),

    confirmPassword: z
      .string()
      .min(1, "確認用パスワードを入力してください"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
