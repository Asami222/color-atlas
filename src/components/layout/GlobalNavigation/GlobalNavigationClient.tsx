'use client';

import { Logo } from "@/components/ui/Logo/Logo";
import { IconButton, IconLink } from "@/components/ui/IconWrapper";
//import { Tooltip } from "@/components/ui/Tooltip";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export interface GlobalNavigationClientProps {
  isAuthenticated: boolean;
  onLogout: () => void | Promise<void>;
}

export function GlobalNavigationClient ({ isAuthenticated, onLogout }: GlobalNavigationClientProps) {

  const pathname = usePathname();

  const handleLogoutClick = async () => {
    try {
      await onLogout();
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
                  <IconLink href="/user" icon="account_circle" label="ログインユーザー" active={pathname === "/user"}/>
                </li>
                <li>
                  <IconButton icon="logout" label="ログアウト" onClick={handleLogoutClick}/>
                </li>
              </>
            ):(
              <>
                <li>
                  <IconLink href="/user" icon="account_circle_off" label="未ログインユーザー" active={pathname === "/user"}/>
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