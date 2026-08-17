import { Button } from "@/components/ui/Button";

export type ExpiredResetLinkProps = {
  onForgotPassword: () => void;
  onLogin: () => void;
};

export function ExpiredResetLink({ onForgotPassword, onLogin,}: ExpiredResetLinkProps) {

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-base font-semibold">
          再設定リンクの有効期限が切れています
        </h2>
        <p className="text-sm">
          再度メールを送信してください。
        </p>
      </div>
        <Button
          type="button"
          size="Small"
          onClick={onForgotPassword}
          className="w-full"
        >
          再設定ページへ戻る
        </Button>
  
        <Button
          type="button"
          size="Small"
          variant="Text"
          onClick={onLogin}
          className="w-full"
        >
          ログインへ戻る
        </Button>
      </div>
  )
}