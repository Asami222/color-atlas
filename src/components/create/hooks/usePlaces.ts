"use client";

import { useQuery } from '@tanstack/react-query'
import type { Place } from '../CreatePlaceForm';


export const usePlaces = () => {

  return useQuery<Place[]>({
    queryKey: ['places'],
    queryFn: async (): Promise<Place[]> => {
      const res = await fetch('/api/create/place')
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