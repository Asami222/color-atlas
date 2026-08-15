import { auth } from "@/libs/auth";
import { db } from "@/libs/db";
import { toPalettesUI, toPaletteUI } from "@/utils/transform";

export async function getPalettes() {
 const session = await auth();

   const palettes = await db.palette.findMany({
     where: {
       userId: session!.user.id,
     },
     include: {
       place: true,
     },
     orderBy: {
       createdAt: "desc",
     },
   });

   const palettesUI = toPalettesUI(palettes);
   
   return palettesUI;
}

export async function getPalette(id: string) {
 const session = await auth();

   const palette = await db.palette.findUnique({
     where: {
       id: id,
       userId: session!.user.id,
     },
     include: {
       place: true,
     },
   });

   if (!palette) {
     throw new Error("Palette not found");
   }

   return toPaletteUI(palette);
}

  
   

