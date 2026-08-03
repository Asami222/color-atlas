import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();



async function main() {
  const password = await bcrypt.hash("password123!", 10);

  const user = await db.user.create({
  data: {
    email: "test@example.com",
    password,
    name: "テストユーザー",
  },
});

const tokyo = await db.place.create({
  data: {
    userId: user.id,
    name: "東京",
  },
});

const osaka = await db.place.create({
  data: {
    userId: user.id,
    name: "大阪",
  },
});

const sapporo = await db.place.create({
  data: {
    userId: user.id,
    name: "札幌",
  },
});

await db.palette.createMany({
  data: [
    {
      userId: user.id,
      placeId: tokyo.id,
      shape: "grid",
      colors: [
        { color: "#FF0000", ratio: 1 },
        { color: "#00FF00", ratio: 1 },
        { color: "#0000FF", ratio: 1 },
      ],
      captureDate: new Date("2023-01-01"),
    },
    {
      userId: user.id,
      placeId: tokyo.id,
      shape: "grid",
      colors: [
        { color: "#FF00FF", ratio: 1 },
        { color: "#00FFFF", ratio: 1 },
      ],
      captureDate: new Date("2023-01-02"),
    },
    {
      userId: user.id,
      placeId: osaka.id,
      shape: "grid",
      colors: [
        { color: "#363636", ratio: 1 },
        { color: "#00FFFF", ratio: 1 },
      ],
      captureDate: new Date("2023-01-02"),
    },
    {
      userId: user.id,
      placeId: sapporo.id,
      shape: "grid",
      colors: [
        { color: "#220000", ratio: 1 },
        { color: "#999999", ratio: 1 },
      ],
      captureDate: new Date("2023-01-02"),
    },
  ],
});
  
  console.log("Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });