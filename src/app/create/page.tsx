
import { auth } from "@/libs/auth";
import { CreateColorAtlasUI } from "./CreateColorAtlasUI";
//import { redirect } from "next/navigation";


export default async function CreateColorAtlas() {
  /*
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
    //notFound();
  }
  
  if (!session?.user?.id) {
    redirect("/login");
  }
  */

  return (
    <CreateColorAtlasUI />
  )
}