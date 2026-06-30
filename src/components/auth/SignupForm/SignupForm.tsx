
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupSchema } from "../libs/validations/authSchema";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Separator";
import { GoogleLogin } from "../GoogleLoginButton";
import { Field } from "@/components/ui/Field";
import { Checkbox } from "@/components/ui/Checkbox";

export type SignupMethod =
  | "credential"
  | "google"
  | null;

export interface SignupFormProps {
  onSignup?: (email: string, password: string, confirmPassword: string, check: boolean) => void
  onGoogleLogin?: () => void
  loadingMethod?: SignupMethod;
  submitError?: string
}

export function SignupForm ({ onSignup, onGoogleLogin, loadingMethod, submitError }: SignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  })

  const isCredentialLoading = loadingMethod === "credential";
  const isGoogleLoading = loadingMethod === "google";

  const isDisabled = loadingMethod !== null || isSubmitting;

  const handleGoogleLogin = () => {
    onGoogleLogin?.();
  }
  
  const onSubmit = ({ email, password, confirmPassword, check }: SignupSchema) => {
    onSignup?.(email, password, confirmPassword, check);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">

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
            <Field label="パスワード" htmlFor="password" error={errors.password?.message} required>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="•••••••••"
                {...register("password")}
                status={errors.password ? "error" : "default"}
              />
            </Field>
            <Field
              label="確認用パスワード" htmlFor="confirmPassword" error={errors.confirmPassword?.message} required>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="•••••••••"
                {...register("confirmPassword")}
                status={errors.confirmPassword ? "error" : "default"}
              />
            </Field>
          </div>
          <div>
            <Checkbox 
              error={!!errors.check}
              required
              {...register("check")}
              label={
                <>
                  <Link
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary"
                  >
                    利用規約
                  </Link>
                  {" および "}
                  <Link
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary"
                  >
                    プライバシーポリシー
                  </Link>
                  {" に同意します"}
                </>
              }
            />
            {errors.check && (
              <p className="mt-1 text-sm text-text-error text-center">
                {errors.check.message}
              </p>
            )}
          </div>
          {/* --- サインアップボタンエリア --- */}
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
                loadingText="作成中..."
                disabled={!isValid || isDisabled}
                data-test-id="signup"
                aria-label="新規登録ボタン"
                className="w-full"
              >
                作成
              </Button>
            </div>

          {/* --- ログインフォームLink --- */}
          <div className="text-center">
            <Link href={`/auth/login`} className="hover:underline hover:cursor-pointer text-text-base text-sm font-medium">
              すでにアカウントをお持ちの方はこちら
            </Link>
          </div>
        </div>
    </form>
  )
}