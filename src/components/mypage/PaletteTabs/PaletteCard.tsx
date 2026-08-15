import { CreatePaletteState } from "@/store/createPalette";
import { PaletteShape } from "@/components/PaletteShape/PaletteShape";
import Link from "next/link";
import clsx from "clsx"

type PaletteCardProps = {
    palette: CreatePaletteState & {
        id: string;
    };
};

export function PaletteCard({
    palette,
}: PaletteCardProps) {
   
    return (
        <Link href={`/mypage/${palette.id}`}>
        <div className="flex items-center justify-center aspect-square w-full">
            <div className={clsx("w-[80%]",palette.shape === "chips" && "md:w-[64%]")}>
                <PaletteShape
                    shape={palette.shape}
                    colors={palette.colors}
                />
            </div>
        </div>
        </Link>
    );
}