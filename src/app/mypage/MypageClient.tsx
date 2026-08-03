import type { PaletteUIModel } from "@/utils/transform";
import { PaletteTabs } from "@/components/mypage/PaletteTabs/PaletteTabs";


export function MypageClient({
  initialPalettes,
}: {
  initialPalettes: PaletteUIModel[];
}) {
  return <PaletteTabs palettes={initialPalettes} />;
}