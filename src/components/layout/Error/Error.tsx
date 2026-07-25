import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import Link from "next/link";

export function Error({ onClick, isLoading }: { onClick: () => void; isLoading: boolean }) {

    return (
          <>
            <div className="block md:hidden">
              <Logo />
            </div>
            <div className="space-y-8 my-16 text-center">
              <div className="space-y-4">
                <h1 className="font-semibold text-base mt-2">エラーが発生しました</h1>
                <p className="text-sm">一時的な問題が発生しました。もう一度試しますか？</p>
              </div>
              <Button
                type="button"
                size="Small"
                loading={isLoading}
                loadingText="再読み込み中です..."
                onClick={onClick}
                className="mx-auto"
              >
                再読み込み
              </Button>
              <div className="text-center">
                { isLoading ? (
                  <p className="text-sm text-text-disabled">しばらくお待ちください...</p>
                ) : (
                  <Link href="/" className="hover:cursor-pointer text-text-base text-sm font-medium">
                  ホームへ戻る
                  </Link>
                )}
             </div>
            </div>
          </>
  );
}