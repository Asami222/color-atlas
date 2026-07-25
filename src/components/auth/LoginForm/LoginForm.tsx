import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "../../../libs/validations/authSchema";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Separator";
import { OAuthLogin } from "../OAuthLoginButton";
import { GuestUserLoginButton } from "./GuestUserLoginButton";
import { Field } from "@/components/ui/Field";
import { AuthPage } from "@/components/layout/AuthPage";

export type LoginMethod =
  | "credential"
  | "guest"
  | "google"
  | "github"
  | null;

export interface LoginFormProps {
  onLogin?: (email: string, password: string) => void;
  onGuestLogin?: () => void;
  onGoogleLogin?: () => void;
  onGitHubLogin?: () => void;
  loadingMethod?: LoginMethod;
  submitError?: string;
}

export function LoginForm ({ onLogin, onGuestLogin, onGoogleLogin, onGitHubLogin, loadingMethod = null, submitError }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  })

  console.log(isValid);

  const isCredentialLoading = loadingMethod === "credential";
  const isGoogleLoading = loadingMethod === "google";
  const isGitHubLoading = loadingMethod === "github";
  const isGuestLoading = loadingMethod === "guest";

  const isDisabled = loadingMethod !== null || isSubmitting;

  const handleGoogleLogin = () => {
    onGoogleLogin?.();
  }

  const handleGitHubLogin = () => {
    onGitHubLogin?.();
  }

  const handleGuestLogin = () => {
    onGuestLogin?.();
  }
  
  const onSubmit = ({ email, password }: LoginSchema) => {
    onLogin?.(email,password);
  }

  return (
    <AuthPage title="ログイン">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">

          {/* --- ゲストユーザー --- */}
          <GuestUserLoginButton onClick={handleGuestLogin} loading={isGuestLoading} disabled={isDisabled}/>
          <div className="flex w-full gap-2 items-center">
          {/* Google */}
          <div className="flex-1">
          <OAuthLogin oauth="google" onClick={handleGoogleLogin} loading={isGoogleLoading} disabled={isDisabled}/>
          </div>
          {/* GitHub */}
          <div className="flex-1">
          <OAuthLogin oauth="github" onClick={handleGitHubLogin} loading={isGitHubLoading} disabled={isDisabled}/>
          </div>
          </div>
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
                type="submit"
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
            <Link href={`/auth/signup`} className="hover:cursor-pointer text-text-base text-sm font-medium">
              アカウントをお持ちでない方はこちら
            </Link>
          </div>
        </div>
    </form>
    </AuthPage>
  )
}