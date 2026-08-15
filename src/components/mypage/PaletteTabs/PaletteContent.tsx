import * as Tabs from "@radix-ui/react-tabs";
import { PaletteCard } from "./PaletteCard";
import type { PaletteUIModel } from "@/utils/transform";
import { groupPalettesByPlace } from "@/utils/groupPalettesByPlace";
import Link from "next/link";

const gridColumns = {
  1: "grid-cols-1 md:grid-cols-3 lg:grid-cols-4",
  2: "grid-cols-2 md:grid-cols-4 lg:grid-cols-5",
  3: "grid-cols-3 md:grid-cols-5 lg:grid-cols-6",
} as const;

export type PaletteContentProps = {
    value: string;
    columns: 1 | 2 | 3;
    palettes: PaletteUIModel[];
    search?: boolean
};

export function PaletteContent({ value, columns, palettes, search = false }: PaletteContentProps) {

    const groups = groupPalettesByPlace(palettes);
    

  return (
    <Tabs.Content value={value} className="mt-8">
        {groups.map((group) => {
            const palette = group.palettes[0];
            // captureDate は ISO文字列なので Date に戻す
            const date = palette?.captureDate
            ? new Date(palette.captureDate)
            : undefined;
            return (
            <section key={group.placeId} className="mb-4">
                { search ? (
                    <div className="flex flex-col gap-1 mb-8">
                        <div>
                            <span className="inline-block w-20 font-medium">場所</span>
                            <span>{group.placeName}</span>
                        </div>

                        <div>
                            <span className="inline-block w-20 font-medium">年月日</span>
                            <span>{date?.toLocaleDateString("ja-JP", {
                                timeZone: "Asia/Tokyo",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                })}
                            </span>
                        </div>

                        <div>
                            <span className="inline-block w-20 font-medium">時間</span>
                            <span>{palette?.hasTime && date
                                    ? date.toLocaleTimeString("ja-JP", {
                                        timeZone: "Asia/Tokyo",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                        })
                                    : ""}
                            </span>
                        </div>
                        <div className="mt-6">
                            <Link 
                                href="/mypage/search"
                                className="px-4 py-2 text-base font-medium text-text-base text-center leading-loose transition-all duration-300 rounded-default hover:text-primary hover:transition-all hover:duration-100 border border-border-secondary hover:border-border-default focus:outline-2 focus:outline-offset-2 focus:outline-primary min-w-24"
                                >
                                条件を変更
                            </Link>
                        </div>
                    </div>
                ): (
                    <h2 className="mb-2 text-text-place-title">{group.placeName}</h2>
                )}
            <div className={`grid gap-4 ${gridColumns[columns]}`}>
                {group.palettes.map((palette) => (
                <PaletteCard
                    key={palette.id}
                    palette={palette}
                />
                ))}
            </div>
            </section>
        )})}
    </Tabs.Content>
  )
}