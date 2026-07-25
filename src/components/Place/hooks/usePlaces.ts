"use client";

import { useQuery } from '@tanstack/react-query'
//import { useRouter } from "next/navigation"

export type Place = {
  id: string;
  name: string;
};

export const usePlaces = () => {
  //const router = useRouter();
  return useQuery<Place[]>({
    queryKey: ['places'],
    queryFn: async (): Promise<Place[]> => {
      const res = await fetch('/api/place')
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