import { searchPalettes } from "@/components/mypage/libs/searchPalettes";
import { redirect } from "next/navigation";
import { PaletteTabs } from "@/components/mypage/PaletteTabs/PaletteTabs";

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