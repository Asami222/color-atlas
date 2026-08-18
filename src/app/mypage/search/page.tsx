import type { Metadata } from "next";
import { createMetadata } from "@/libs/metadata";
import { getPalettes } from "@/components/create/libs/color";
import { SearchPaletteForm } from "@/components/mypage/search/SearchPaletteForm";

export const metadata: Metadata = createMetadata({
    title: "パレット検索",
    description: "登録したパレットを場所、日付、時間から選択できます",
    path: "/mypage/search",
});

export default async function SearchPage() {
  const palettes = await getPalettes();

  return <SearchPaletteForm palettes={palettes} />;
}