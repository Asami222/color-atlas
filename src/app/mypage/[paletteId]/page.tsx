import type { Metadata } from "next";
import { createMetadata } from "@/libs/metadata";
import { getPalette } from "@/components/create/libs/color";
import { PaletteDetailContainer } from "@/components/mypage/detail";

export async function generateMetadata({params}: {params: Promise<{ paletteId: string }>}): Promise<Metadata> {
  const { paletteId } = await params;

  return createMetadata({
    title: "パレット詳細",
    description: "登録したパレットの詳細ページです。ここから編集や削除も可能です",
    path: `/mypage/${paletteId}`,
  });
}

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