"use client";

import { useQuery } from '@tanstack/react-query'
import { CreatePaletteRequest } from "@/types/palette";


export const useCreateColor = () => {

  return useQuery<CreatePaletteRequest[]>({
    queryKey: ['createPalette'],
    queryFn: async (): Promise<CreatePaletteRequest[]> => {
      const res = await fetch('/api/create/palette')
      if (!res.ok) {
        if (res.status === 401) {
        return [];
      }
        throw new Error('Failed')
      }
      return res.json()
    },
    staleTime: 5 * 60 * 1000,
  })
}