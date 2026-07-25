import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export function ExpiredResetLink() {

  const router = useRouter()

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
          onClick={() => router.push("/auth/forgot-password")}
          className="w-full"
        >
          再設定ページへ戻る
        </Button>
  
        <Button
          type="button"
          size="Small"
          variant="Text"
          onClick={() => router.push("/auth/login")}
          className="w-full"
        >
          ログインへ戻る
        </Button>
      </div>
  )
}