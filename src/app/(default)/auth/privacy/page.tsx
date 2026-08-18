import type { Metadata } from "next";
import { createMetadata } from "@/libs/metadata";
import { Privacy } from "@/components/auth/Privacy/Privacy"

export const metadata: Metadata = createMetadata({
    title: "プライバシーポリシー",
    description: "プライバシーポリシーの内容を記載しています",
    path: "/auth/privacy",
});

export default function PrivacyPage() {
  return <Privacy />
}