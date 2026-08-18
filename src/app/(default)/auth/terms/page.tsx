import type { Metadata } from "next";
import { createMetadata } from "@/libs/metadata";
import { Terms } from "@/components/auth/Terms/Terms"

export const metadata: Metadata = createMetadata({
    title: "利用規約",
    description: "利用規約の内容を記載しています",
    path: "/auth/terms",
});

export default function TermsPage() {
  return <Terms />
}