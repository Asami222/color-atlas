import { CreatePaletteState } from "@/store/createPalette";
import { PaletteShape } from "@/components/PaletteShape/PaletteShape";

type PaletteCardProps = {
    palette: CreatePaletteState;
};

export function PaletteCard({
    palette,
}: PaletteCardProps) {
    return (
        <div className="flex items-center justify-center" style={{ width: `100%`, aspectRatio: `1/1` }}>
            <div className="width-[80%]">
                <PaletteShape
                    shape={palette.shape}
                    colors={palette.colors}
                />
            </div>
        </div>
    );
}