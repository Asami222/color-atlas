import { getPalettes } from "@/components/create/libs/color";
import { MypageClient } from "./MypageClient";


export default async function MyPage() {
  const palettes = await getPalettes(); 
  return <MypageClient initialPalettes={palettes} />;
}