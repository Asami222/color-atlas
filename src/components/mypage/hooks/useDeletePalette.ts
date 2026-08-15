
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { PaletteUIModel } from '@/utils/transform'
import type { Place } from "@prisma/client";


export const useDeletePalette = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
    }: {
      id: string
    }) => {
      const res = await fetch(`/api/palette/${id}/delete`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed')
      return res.json()
    },
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: ['palettes'] })
      //await queryClient.cancelQueries({ queryKey: ['places'] })

      const previousPalettes =
        queryClient.getQueryData<PaletteUIModel[]>(['palettes'])
      /*
      const previousPlaces =
        queryClient.getQueryData<Place[]>(['places'])
      
      const targetPalette = previousPalettes?.find(p => p.id === id)
      */
      if (previousPalettes) {
        queryClient.setQueryData(
          ['palettes'],
          previousPalettes.filter(p => p.id !== id)
        )
      }
      /*
        const shouldDeletePlace =
          previousPalettes?.filter(
            p => p.place.id === targetPalette?.place.id
          ).length === 1;
        
        if (shouldDeletePlace && previousPlaces) {
          queryClient.setQueryData(
            ['places'],
            previousPlaces.filter(
              place => place.id !== targetPalette?.place.id
            )
          );
          }
          */
          return { previousPalettes }
      },

    onError: (_err, _vars, context) => {
      if (context?.previousPalettes) {
        queryClient.setQueryData(['palettes'], context.previousPalettes)
      }
      /*
      if (context?.previousPlaces) {
        queryClient.setQueryData(['places'], context.previousPlaces)
      }
      */
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['palettes'] })
      queryClient.invalidateQueries({ queryKey: ['places'] })
    },
  })
}