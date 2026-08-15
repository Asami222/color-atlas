import { PaletteUIModel } from "@/utils/transform";
import { shapeMap } from "@/components/PaletteShape/type";
import { formatCaptureDate } from "@/utils/formatCaptureDate";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

type PaletteDetailProps = {
  palette: PaletteUIModel;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export function PaletteDetail({ palette, onDelete, isDeleting }: PaletteDetailProps) {
  const ShapeComponent = shapeMap[palette.shape];
  
  return (
    <div className="max-w-135 w-full flex flex-col items-center justify-center gap-10 mx-auto">
      <div className="flex justify-center items-center mx-auto w-full h-auto py-6 rounded-default bg-background-secondary">
        {ShapeComponent && (
          <div className="w-50"><ShapeComponent colorData={palette.colors} /></div>
        )}
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-8 text-center px-4">
        <p className="w-full p-3 bg-background-secondary">{palette.place.name}</p>
        <p className="w-full p-3 bg-background-secondary">{palette.captureDate ? formatCaptureDate(palette.captureDate) : formatCaptureDate(palette.createdAt)}</p>
      {palette.memo && (
        <p className="w-full p-3 bg-background-secondary text-[15px]">{palette.memo}</p>
      )}
      </div>
      <div className="w-full flex justify-around items-center">
        <Link 
          href={`/mypage/${palette.id}/edit`}
          className="flex items-center justify-center text-base font-medium text-text-base text-center px-4 py-2 leading-loose transition-all duration-300 rounded-default hover:text-primary hover:transition-all hover:duration-100 focus:outline-2 focus:outline-offset-2 focus:outline-primary bg-secondary border border-border-default min-w-24"
        >
          編集
        </Link>
        <Button 
          variant="Outline" 
          size="Small"
          loading={isDeleting}
          loadingText="削除中..."
          disabled={isDeleting}
          onClick={() => onDelete(palette.id)}
        >
          削除
        </Button>
      </div>
    </div>
  );
}