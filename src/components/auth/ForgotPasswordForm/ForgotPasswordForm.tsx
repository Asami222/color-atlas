
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordRequestSchema, type ForgotPasswordRequestSchema } from "@/libs/validations/authSchema";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Field } from "@/components/ui/Field";
import { AuthPage } from "@/components/layout/AuthPage";


export interface ForgotPasswordFormProps {
  onClick?: (email: string) => void
  sent: boolean
  isLoading?: boolean;
  submitError?: string
}

export function ForgotPasswordForm ({ onClick, isLoading, submitError, sent }: ForgotPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ForgotPasswordRequestSchema>({
    resolver: zodResolver(forgotPasswordRequestSchema),
    mode: "onChange",
  })

  const isDisabled = isLoading || isSubmitting || sent;
  
  const onSubmit = (data: ForgotPasswordRequestSchema) => {
    onClick?.(data.email);
  }

  return (
    <AuthPage title="パスワード再発行" helperText="登録いただいたメールアドレスを入力いただくと、パスワード再発行リンクを送信します。">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
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
            {submitError && (
              <p role="alert" data-testid="forgot-password-error" className="text-text-error text-center text-sm my-2">
                {submitError}
              </p>
            )}
              <Button
                type="submit"
                size="Small"
                error={!!submitError}
                loading={isLoading}
                loadingText="送信中..."
                disabled={!isValid || isDisabled}
                data-test-id="forgot-password"
                aria-label="パスワード変更"
                className="w-full"
              >
                {sent ? "メール送信済み" : "再発行メールを送信"}
              </Button>
            </div>
        </div>
    </form>
    </AuthPage>
  )
}