
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "../libs/validations/authSchema";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Separator";
import { GoogleLogin } from "../GoogleLoginButton";
import { GuestUserLoginButton } from "./GuestUserLoginButton";
import { Field } from "@/components/ui/Field";

export type LoginMethod =
  | "credential"
  | "guest"
  | "google"
  | null;

export interface LoginFormProps {
  onLogin?: (email: string, password: string) => void
  onGuestLogin?: () => void;
  onGoogleLogin?: () => void
  loadingMethod?: LoginMethod;
  submitError?: string
}

export function LoginForm ({ onLogin, onGuestLogin, onGoogleLogin, loadingMethod, submitError }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  })

  const isCredentialLoading = loadingMethod === "credential";
  const isGoogleLoading = loadingMethod === "google";
  const isGuestLoading = loadingMethod === "guest";

  const isDisabled = loadingMethod !== null || isSubmitting;

  const handleGoogleLogin = () => {
    onGoogleLogin?.();
  }

  const handleGuestLogin = () => {
    onGuestLogin?.();
  }
  
  const onSubmit = ({ email, password }: LoginSchema) => {
    onLogin?.(email,password);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">

          {/* --- ゲストユーザー --- */}
          <GuestUserLoginButton onClick={handleGuestLogin} loading={isGuestLoading} disabled={isDisabled}/>

          {/* Google */}
          <GoogleLogin onClick={handleGoogleLogin} loading={isGoogleLoading} disabled={isDisabled}/>
        </div>

        {/* 区切り線 */}
        <Separator>または</Separator>

        {/* --- クレデンシャル --- */}
          <div className="space-y-3">
            <Field label="メールアドレス" htmlFor="email" error={errors.email?.message} required>
              <Input 
                id="email"
                type="email"
                autoComplete="email"
                placeholder="admin@example.com"
                {...register("email")}
                status={errors.email ? "error" : "default"}
              />
            </Field>
            <div>
            <Field label="パスワード" htmlFor="password" error={errors.password?.message} required>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="•••••••••"
                {...register("password")}
                status={errors.password ? "error" : "default"}
              />
            </Field>
            {/* --- Forfot Password --- */}
              <div className="text-center mt-2">
                <Link href={`/auth/forgot-password`} className="hover:underline hover:cursor-pointer text-sm text-orange-950">
                  パスワードを忘れましたか？
                </Link>
              </div>
          </div>
          </div>

          {/* --- ログインボタンエリア --- */}
          <div>
            {submitError && (
              <p role="alert" data-testid="login-error" className="text-text-error text-center text-sm my-2">
                {submitError}
              </p>
            )}
              <Button
                size="Small"
                error={!!submitError}
                loading={isCredentialLoading}
                loadingText="送信中..."
                disabled={!isValid || isDisabled}
                data-test-id="login"
                aria-label="ログイン"
                className="w-full"
              >
                ログイン
              </Button>
            </div>

          {/* --- 新規登録Link --- */}
          <div className="text-center">
            <Link href={`/auth/signup`} className="hover:underline hover:cursor-pointer text-text-base text-sm font-medium">
              アカウントをお持ちでない方はこちら
            </Link>
          </div>
        </div>
    </form>
  )
}