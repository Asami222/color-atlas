import * as Tabs from "@radix-ui/react-tabs";
import { PaletteCard } from "./PaletteCard";
import type { PaletteUIModel } from "@/utils/transform";

export type PaletteContentProps = {
    value: string;
    columns: 1 | 2 | 3;
    palettes: PaletteUIModel[];
};

export function PaletteContent({ value, columns, palettes }: PaletteContentProps) {
  return (
    <Tabs.Content value={value}>
        <div className={`grid gap-4 grid-cols-${columns} md:grid-cols-${columns + 2}`}>
            {palettes.map((palette) => (
                <PaletteCard
                    key={palette.shape + palette.colors.map(c => c.color).join('-')}
                    palette={palette}
                />
            ))}
        </div>
    </Tabs.Content>
  )
}