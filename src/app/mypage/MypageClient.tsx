"use client";

import type { PaletteUIModel } from "@/utils/transform";
import { PaletteTabs } from "@/components/mypage/PaletteTabs/PaletteTabs";
import { usePalettes } from "@/components/mypage/hooks/usePalettes";
import { IconLink } from "@/components/ui/IconWrapper";
import { Tooltip } from "@/components/ui/Tooltip";

export function MypageClient({
  initialPalettes,
}: {
  initialPalettes: PaletteUIModel[];
}) {

  const { data: palettes = [], isFetching, isLoading } = usePalettes(initialPalettes);

  return (
    <div>
      <Tooltip content="検索" side="right">
      <div className="w-10.5 mb-4 mx-auto">
        <IconLink href="/mypage/search" icon="search" label="パレット検索" variant="sub"/>
      </div>
      </Tooltip>
      <PaletteTabs palettes={palettes} />
    </div>
  );
}