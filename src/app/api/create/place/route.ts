import { auth } from "@/libs/auth";
import { getPlaces } from "@/components/create/libs/place";

export async function GET() {

    const session = await auth();

  if (!session?.user?.id) {
    return Response.json([])}
  
    const places = await getPlaces(session.user.id)
  
  return Response.json(places);
 }