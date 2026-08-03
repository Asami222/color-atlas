import { getColors } from "@/components/create/libs/color";
import { MypageClient } from "./MypageClient";


export default async function MyPage() {
  const palettes = await getColors(); 

  return <MypageClient initialPalettes={palettes} />;
}