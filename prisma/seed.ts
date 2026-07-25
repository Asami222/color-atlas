import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password123!", 10);

  await db.user.create({
    data: {
      email: "test@example.com",
      password,
      name: "テストユーザー",

      places: {
        create: [
          { name: "東京" },
          { name: "大阪" },
          { name: "札幌" },
        ],
      },
    },
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