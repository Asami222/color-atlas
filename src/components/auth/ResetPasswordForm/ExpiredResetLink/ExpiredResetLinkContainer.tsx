import { useRouter } from "next/navigation";
import { ExpiredResetLink } from "./ExpiredResetLink"

export function ExpiredResetLinkContainer() {

  const router = useRouter()

  return <ExpiredResetLink 
            onForgotPassword={() => router.push("/auth/forgot-password")} 
            onLogin={() => router.push("/auth/login")}
          />
}