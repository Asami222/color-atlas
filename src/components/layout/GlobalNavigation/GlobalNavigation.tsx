import { auth } from "@/libs/auth"; // auth.tsからインポート
import { GlobalNavigationClient } from "./GlobalNavigationClient";
//import { handleLogout } from "@/app/actions/auth";

export async function GlobalNavigation() {
  const session = await auth();
  const isAuthenticated = !!session;

  return (
    <GlobalNavigationClient 
      isAuthenticated={isAuthenticated} 
    />
  );
}