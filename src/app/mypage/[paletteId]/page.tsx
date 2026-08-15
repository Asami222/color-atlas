import { getPalette } from "@/components/create/libs/color";
import { PaletteDetailContainer } from "@/components/mypage/detail";

type Props = {
  params: Promise<{
    paletteId: string;
  }>;
};

export default async function PaletteDetailPage({
  params,
}: Props) {
  const { paletteId } = await params;

  const palette = await getPalette(paletteId);

  return (
    <PaletteDetailContainer palette={palette} />
  );
}