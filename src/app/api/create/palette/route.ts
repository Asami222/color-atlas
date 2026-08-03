import { auth } from "@/libs/auth";
import { getColors } from "@/components/create/libs/color";

export async function GET() {

    const session = await auth();

  if (!session?.user?.id) {
    return Response.json([])}
  
    const colors = await getColors(session.user.id)
  
  return Response.json(colors);
 }