import { z } from "zod";

export const createSchema = z.object({
  placeId: z.string().min(1, {
    message: "場所の選択は必須です",
  }),
  memo: z.string().optional(),
  isDateEnabled: z.boolean(),
  hasTime: z.boolean(),
  date: z.date().optional(),
})

export type CreateSchema = z.infer<typeof createSchema>;


export const searchSchema = z.object({
  placeId: z.string().min(1, {
    message: "場所の選択は必須です",
  }),
  date: z.string(),
  time: z.string(),
})

export type SearchSchema = z.infer<typeof searchSchema>;



export const newPlaceSchema = z.object({
  text: z
    .string()
    .min(1, "場所またはカテゴリーを入力してください")
});

export type NewPlaceSchema = z.infer<typeof newPlaceSchema>;