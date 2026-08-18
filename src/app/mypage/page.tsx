import type { Metadata } from "next";
import { createMetadata } from "@/libs/metadata";
import { getPalettes } from "@/components/create/libs/color";
import { MypageClient } from "./MypageClient";

export const metadata: Metadata = createMetadata({
    title: "カラーパレット",
    description: "登録したカラーパレットを表示します",
    path: "/mypage",
});

export default async function MyPage() {
  const palettes = await getPalettes(); 
  return <MypageClient initialPalettes={palettes} />;
}