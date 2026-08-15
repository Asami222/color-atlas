"use client";

import { PaletteUIModel } from "@/utils/transform";
import { PaletteDetail } from "./PaletteDetail"
import { useDeletePalette } from "../hooks/useDeletePalette";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type PaletteDetailContainerProps = {
  palette: PaletteUIModel;
}


export function PaletteDetailContainer({ palette }: PaletteDetailContainerProps) {

  const router = useRouter()
  const deletePalette  = useDeletePalette();

  const handleDelete = async(id: string) => {
    deletePalette.mutate(
      { id },
      {
        onError: (error: unknown) => {
          if (error instanceof Error) {
            toast.error(error.message)
          }
        },
      }
    )
    router.push("/mypage");
  };

  return (
    <PaletteDetail palette={palette} onDelete={handleDelete} isDeleting={deletePalette.isPending} />
  )
}