import type { Metadata } from "next";
import { createMetadata } from "@/libs/metadata";
import { searchPalettes } from "@/components/mypage/libs/searchPalettes";
import { redirect } from "next/navigation";
import { PaletteTabs } from "@/components/mypage/PaletteTabs/PaletteTabs";

export const metadata: Metadata = createMetadata({
    title: "パレット検索結果",
    description: "検索したパレットの結果を表示します",
    path: "/mypage/search/result",
});

export default async function SearchResultPage({
  searchParams,
}: {
  searchParams: Promise<{
    placeId?: string;
    date?: string;
    time?: string;
  }>;
}) {
  const { placeId, date, time } = await searchParams;

   if (!placeId) {
    redirect("/mypage/search");
  }

  const palettes = await searchPalettes({
    placeId,
    date,
    time,
  });

  return (
    <div>
      <PaletteTabs palettes={palettes} search/>
    </div>
  );
}