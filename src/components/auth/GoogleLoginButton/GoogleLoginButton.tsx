import Image from "next/image";
import { Button } from "@/components/ui/Button";

export type GoogleLoginProps = {
  loading: boolean
  disabled: boolean
  onClick: () => void
}

export function GoogleLogin({loading, disabled, onClick}: GoogleLoginProps) {
  return (
    <Button
      variant="Outline"
      size="Small"
      loading={loading}
      disabled={disabled}
      loadingText="処理中です..."
      aria-label="グーグルでログイン"
      onClick={onClick}
    >
      <div className="w-full flex justify-center items-center gap-2">
        <Image
          src="/svg/google.svg"
          alt="Google"
          width={20}
          height={20}
        />
        <span>Googleで続ける</span>
      </div>
    </Button>
  )
}