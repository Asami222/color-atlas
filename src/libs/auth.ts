// src/libs/auth.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import authConfig from "./auth.config";
import GoogleProvider from "next-auth/providers/google"
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"
import { loginSchema } from "./validations/authSchema";
import { compare } from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  // Prismaアダプターを設定
  adapter: PrismaAdapter(db),
  
  // 認証プロバイダー（使いたいログイン方法）を設定
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        
        // NextAuthのauthorize内でもloginSchemaを使ってバリデーション
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null
        
        const { email, password } = parsed.data
        const user = await db.user.findUnique({
          where: { email },
        })
        //console.log(credentials, user)
        if (!user) return null

        // パスワードを持たないユーザー（OAuthユーザー）は
        // Credentialsログインできない
        if (!user.password) return null;

        const isValid = await compare(password, user.password)
        //console.log("compare result:", isValid)
        if (!isValid) return null

        return { id: user.id, name: user.name, email: user.email }
      },
    }),
  ],

  // セッションの保持方法（通常はデータベースに保存、またはJWT）
  session: { strategy: "jwt" },

  // 必要に応じてコールバックなどを設定
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // セッション情報にユーザーIDを含める
      }
      return session;
    },
  },
});