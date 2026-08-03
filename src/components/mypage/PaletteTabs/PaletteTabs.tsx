import * as Tabs from "@radix-ui/react-tabs";
import { PaletteTabList } from "./PaletteTabList";
import { PaletteContent } from "./PaletteContent";
import type { PaletteUIModel } from "@/utils/transform";

export function PaletteTabs({
  palettes
}: {palettes: PaletteUIModel[]}) {
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
      />

      <PaletteContent
        value="middle"
        palettes={palettes}
        columns={2}
      />

      <PaletteContent
        value="small"
        palettes={palettes}
        columns={3}
      />
    </Tabs.Root>
  );
}