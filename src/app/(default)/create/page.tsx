import type { Metadata } from "next";
import { createMetadata } from "@/libs/metadata";
import { PaletteForm } from "@/components/create/PaletteForm/PaletteForm";

export const metadata: Metadata = createMetadata({
    title: "パレット登録",
    description: "生成したカラーパレットを登録します",
    path: "/create",
});

export default async function CreateColorAtlas() {

  return (
    <PaletteForm mode="create" />
  )
}