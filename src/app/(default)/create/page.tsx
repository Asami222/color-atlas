
import { PaletteForm } from "@/components/PaletteForm";
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
    <PaletteForm mode="create" />
  )
}