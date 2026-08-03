import { auth } from "@/libs/auth";
import { db } from "@/libs/db";
import { toPalettesUI } from "@/utils/transform";

export async function getColors() {
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

