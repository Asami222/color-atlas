import { getPalette } from "@/components/create/libs/color";
import { PaletteForm } from "@/components/PaletteForm";

type Props = {
  params: Promise<{
    paletteId: string;
  }>;
};

export default async function EditPalettePage({ params }: Props) {
  const { paletteId } = await params;

  const palette = await getPalette(paletteId);

  return (
    <PaletteForm
      mode="edit"
      initialPalette={palette}
    />
  );
}