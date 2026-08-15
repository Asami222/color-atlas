import { db } from "@/libs/db";
import { auth } from "@/libs/auth";
import { redirect } from "next/navigation";

export async function getPalettes(userId: string) {

  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  return db.palette.findMany({
    where: {
      userId,
    },
  });
}

