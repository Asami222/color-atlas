
import { getPalettes } from "@/components/create/libs/color";

export async function GET() {

    const palettes = await getPalettes()
  
  return Response.json(palettes);
 }