import type { Metadata } from "next";
import { createMetadata } from "@/libs/metadata";
import { getPalette } from "@/components/create/libs/color";
import { PaletteForm } from "@/components/create/PaletteForm/PaletteForm";

export async function generateMetadata({params}: {params: Promise<{ paletteId: string }>}): Promise<Metadata> {
  const { paletteId } = await params;

  return createMetadata({
    title: "パレット編集",
    description: "登録したパレットを編集し保存します",
    path: `/mypage/${paletteId}/edit`,
  });
}

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