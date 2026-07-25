import { auth } from "@/libs/auth";
import { NextResponse } from "next/server";

const guestRoutes = [
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/create",
];

const protectedRoutes = [
  "/profile",
  "/favorites",
  "/settings",
];

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  const isLoggedIn = !!req.auth;

  // ログイン済みなら認証ページへ行かせない
  if (
    isLoggedIn &&
    guestRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 未ログインなら保護ページへ行かせない
  if (
    !isLoggedIn &&
    protectedRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * api、_next、画像などは除外
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};