import type { PaletteUIModel } from "@/utils/transform";
import { useQuery } from '@tanstack/react-query'

export const usePalettes = (initialData?: PaletteUIModel[]) => {
  return useQuery<PaletteUIModel[]>({
    queryKey: ['palettes'],
    queryFn: async (): Promise<PaletteUIModel[]> => {
      const res = await fetch('/api/palette')
      if (!res.ok) {
        throw new Error('Failed to fetch user data')
      }
      return res.json()
    },
    initialData: initialData ?? undefined,
    staleTime: 5 * 60 * 1000,
  })
}