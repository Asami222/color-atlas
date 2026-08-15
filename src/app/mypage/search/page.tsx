import { getPalettes } from "@/components/create/libs/color";
import { SearchPaletteForm } from "@/components/mypage/search/SearchPaletteForm";

export default async function SearchPage() {
  const palettes = await getPalettes();

  return <SearchPaletteForm palettes={palettes} />;
}