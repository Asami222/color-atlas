import { Dialog } from "@/components/ui/Dialog/Dialog";
import { Button } from "@/components/ui/Button";

export interface LoginRequiredDialogProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  onLogin: () => void;
  onSignup: () => void;
}

export function LoginRequiredDialog({onOpenChange, open, onLogin, onSignup}: LoginRequiredDialogProps) {

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="ログインが必要です"
      description="場所を保存するにはログインまたは新規登録が必要です。"
      footer={
        <div className="flex gap-1">
          <Button
            size="Small"
            variant="Outline"
            onClick={() => onOpenChange(false)}
            className="text-sm md:text-base"
          >
            キャンセル
          </Button>

          <Button
            size="Small"
            variant="Outline"
            onClick={onSignup}
            className="text-sm md:text-base"
          >
            新規登録
          </Button>

          <Button
            size="Small"
            onClick={onLogin}
            className="text-sm md:text-base"
          >
            ログイン
          </Button>
        </div>
      }
    />
  )
}