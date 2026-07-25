import { z } from "zod";

export const newPlaceSchema = z.object({
  text: z
    .string()
    .min(1, "場所またはカテゴリーを入力してください")
});

export type NewPlaceSchema = z.infer<typeof newPlaceSchema>;