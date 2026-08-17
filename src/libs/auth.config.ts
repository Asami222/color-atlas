import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

const guestRoutes = [
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/reset-password",
];

const protectedRoutes = [
  "/mypage",
];

export default {
  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const isLoggedIn = !!auth;

      if (
        isLoggedIn &&
        guestRoutes.some((route) => pathname.startsWith(route))
      ) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      if (
        !isLoggedIn &&
        protectedRoutes.some((route) => pathname.startsWith(route))
      ) {
        return NextResponse.redirect(
          new URL("/auth/login", request.url)
        );
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;