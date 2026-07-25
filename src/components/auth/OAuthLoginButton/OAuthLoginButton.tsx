import Image from "next/image";
import { Button } from "@/components/ui/Button";

export type OAuthLoginProps = {
  oauth: "google" | "github"
  loading: boolean
  disabled: boolean
  onClick: () => void
}

export function OAuthLogin({oauth, loading, disabled, onClick}: OAuthLoginProps) {
  return (
    <Button
      type="button"
      variant="Outline"
      size="Small"
      loading={loading}
      disabled={disabled}
      loadingText="処理中です..."
      aria-label={oauth === "google" ? "Googleでログイン" : "GitHubでログイン"}
      onClick={onClick}
      className="w-full"
    >
      <div className="w-full flex justify-center items-center gap-2">
        <Image
          src={oauth === "google" ? "/svg/google.svg" : "/svg/github.svg"}
          alt={oauth === "google" ? "Google" : "GitHub"}
          width={20}
          height={20}
        />
        <span>{oauth === "google" ? "Googleで続ける" : "GitHubで続ける"}</span>
      </div>
    </Button>
  )
}