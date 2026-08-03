'use client';

import { Logo } from "@/components/ui/Logo/Logo";
import { IconButton, IconLink } from "@/components/ui/IconWrapper";
//import { Tooltip } from "@/components/ui/Tooltip";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

export interface GlobalNavigationClientProps {
  isAuthenticated: boolean;
}

export function GlobalNavigationClient ({ isAuthenticated }: GlobalNavigationClientProps) {

  const pathname = usePathname();

  const handleLogoutClick = async () => {
    try {
      await signOut({
      callbackUrl: "/",
    });
      toast.success("ログアウトしました");
    } catch (error) {
      console.error("ログアウトに失敗しました", error);
      toast.error("ログアウトに失敗しました");
    }
  };

  return (
    <nav aria-labelledby="global-navigation" className="flex bg-background-default fixed bottom-0 left-0 right-0 md:top-0 md:bottom-auto z-50 shadow-original-sp md:shadow-original" role="banner">
      <h2 id="global-navigation" className="sr-only">グローバルナビゲーション</h2>
      <div className="flex w-full max-w-7xl justify-between items-center px-6 py-4">
        <div className="hidden md:block">
          <Logo />
        </div>
          <ul className="flex w-full items-center justify-around md:w-auto md:justify-end md:gap-6">
            <li>
              <IconLink href="/" icon="home" label="ホーム" active={pathname === "/"}/>
            </li>
            { isAuthenticated ? (
              <>
                <li>
                  <IconLink href="/mypage" icon="account_circle" label="ログインユーザー" active={pathname === "/mypage"}/>
                </li>
                <li>
                  <IconButton icon="logout" label="ログアウト" onClick={handleLogoutClick}/>
                </li>
              </>
            ):(
              <>
                <li>
                  <IconLink href="/mypage" icon="account_circle_off" label="未ログインユーザー" active={pathname === "/mypage"}/>
                </li>
                <li>
                  <IconLink href="/login" icon="login" label="ログイン" active={pathname === "/login"}/>
                </li>
            </>
            )}
          </ul>
      </div>
    </nav>
  )
}