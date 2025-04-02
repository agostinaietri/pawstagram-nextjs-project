import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Crear algunos usuarios
  const user1 = await prisma.user.create({
    data: {
      username: "gatito_lover",
      email: "gatito@pawstagram.com",
      password: "password123",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "catlady",
      email: "catlady@pawstagram.com",
      password: "password456",
    },
  });

  // Crear hashtags
  const hashtag1 = await prisma.hashtag.create({
    data: { tag: "gatos" },
  });

  const hashtag2 = await prisma.hashtag.create({
    data: { tag: "cute" },
  });

  // Crear un post con hashtags
  const post = await prisma.post.create({
    data: {
      caption: "Mi gatito durmiendo 😻",
      type: "IMAGE",
      fileUrl: "https://s3.bucket.com/gato.jpg",
      userId: user1.id,
      hashtags: {
        create: [
          { hashtag: { connect: { id: hashtag1.id } } },
          { hashtag: { connect: { id: hashtag2.id } } },
        ],
      },
    },
  });

  console.log("Database seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
