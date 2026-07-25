
import { db } from "@/libs/db";

export async function getPlaces(userId: string) {
  return db.place.findMany({
    where: {
      userId,
    },
    orderBy: {
      name: "asc",
    },
  });
}

