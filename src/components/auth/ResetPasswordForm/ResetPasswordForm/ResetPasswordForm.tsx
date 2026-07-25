
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, type ResetPasswordSchema } from "../../../../libs/validations/authSchema";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Field } from "@/components/ui/Field";
import { AuthPage } from "@/components/layout/AuthPage";


export interface ResetPasswordFormProps {
  onClick?: (password: string, confirmPassword: string) => void
  isLoading?: boolean;
  submitError?: string
}

export function ResetPasswordForm ({ onClick, isLoading, submitError }: ResetPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  })

  const isDisabled = isLoading || isSubmitting;
  
  const onSubmit = (data: ResetPasswordSchema) => {
    const { password, confirmPassword } = data
    onClick?.(password, confirmPassword);
  }

  return (
    <AuthPage title="パスワード再作成" helperText="パスワードは8文字以上で入力してください。少なくとも1つの数字と1つの記号を含めてください。">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="space-y-3">
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
            {submitError && (
              <p role="alert" data-testid="reset-password-error" className="text-text-error text-center text-sm my-2">
                {submitError}
              </p>
            )}
              <Button
                type="submit"
                size="Small"
                error={!!submitError}
                loading={isLoading}
                loadingText="作成中..."
                disabled={!isValid || isDisabled}
                data-test-id="reset-password"
                aria-label="パスワードリセット"
                className="w-full"
              >
                新パスワード作成
              </Button>
            </div>
        </div>
    </form>
   </AuthPage>
  )
}