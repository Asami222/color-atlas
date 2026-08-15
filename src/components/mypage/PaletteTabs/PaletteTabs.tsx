import * as Tabs from "@radix-ui/react-tabs";
import { PaletteTabList } from "./PaletteTabList";
import { PaletteContent } from "./PaletteContent";
import type { PaletteUIModel } from "@/utils/transform";

type PaletteTabsProps = {
  palettes: PaletteUIModel[];
  search?: boolean
}

export function PaletteTabs({ palettes, search = false}: PaletteTabsProps) {
  
  return (
    <Tabs.Root
      defaultValue="large"
      className="flex flex-col w-full"
    >
      <PaletteTabList />

      <PaletteContent
        value="large"
        palettes={palettes}
        columns={1}
        search={search}
      />

      <PaletteContent
        value="middle"
        palettes={palettes}
        columns={2}
        search={search}
      />

      <PaletteContent
        value="small"
        palettes={palettes}
        columns={3}
        search={search}
      />
    </Tabs.Root>
  );
}