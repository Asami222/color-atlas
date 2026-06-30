import { Button } from "@/components/ui/Button"

export type GuestUserLoginButtonProps = {
  loading: boolean
  disabled: boolean
  onClick: () => void
}

export function GuestUserLoginButton({loading, disabled, onClick}: GuestUserLoginButtonProps) {
  return (
    <Button 
      variant="Outline"
      size="Small"
      disabled={disabled}
      loading={loading}
      loadingText="処理中です..."
      aria-label="ゲストユーザーログイン"
      onClick={onClick}
    >
      ゲストユーザーでログイン
    </Button>
  )
}