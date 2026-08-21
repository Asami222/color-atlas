import { CreatePaletteState } from "@/store/createPalette";
import { PaletteShape } from "@/components/PaletteShape/PaletteShape";
import Link from "next/link";

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
            <div className={palette.shape === "chips" ? "w-[64%]" : "w-[80%]"}>
                <PaletteShape
                    shape={palette.shape}
                    colors={palette.colors}
                />
            </div>
        </div>
        </Link>
    );
}