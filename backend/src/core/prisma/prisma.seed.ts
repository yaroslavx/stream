import { BadRequestException, Logger } from "@nestjs/common";
import { PrismaClient, Prisma } from "../../../prisma/generated";
import { CATEGORIES } from "./data/categories.data";
import { STREAMS } from "./data/streams.data";
import { USERNAMES } from "./data/users.data";
import { hash } from "argon2";

const prisma = new PrismaClient({
  transactionOptions: {
    maxWait: 5000,
    timeout: 15000,
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
  },
});

async function main() {
  try {
    Logger.log("Начало заполнения БД");

    await prisma.$transaction([
      prisma.user.deleteMany(),
      prisma.socialLink.deleteMany(),
      prisma.stream.deleteMany(),
      prisma.category.deleteMany(),
    ]);

    const categoriesData = CATEGORIES;

    await prisma.category.createMany({
      data: categoriesData,
    });

    Logger.log("Категории созданы");

    const categories = await prisma.category.findMany();

    const categoriesBySlug = Object.fromEntries(
      categories.map((category) => [category.slug, category]),
    );

    const streamsData: Record<string, string[]> = STREAMS;

    const usernamesData = USERNAMES;

    await prisma.$transaction(async (tx) => {
      for (const username of usernamesData) {
        const randomCategory =
          categoriesBySlug[
            Object.keys(categoriesBySlug)[
              Math.floor(Math.random() * Object.keys(categoriesBySlug).length)
            ]
          ];

        const userExists = await tx.user.findUnique({
          where: { username },
        });

        if (!userExists) {
          const createdUser = await tx.user.create({
            data: {
              email: `${username}@gmail.com`,
              password: await hash("12345678"),
              username,
              displayName: username,
              avatar: `/channels/${username}.webp`,
              isEmailVerified: true,
              socialLinks: {
                createMany: {
                  data: [
                    {
                      title: "Telegram",
                      url: `https://t.me/${username}`,
                      position: 1,
                    },
                    {
                      title: "YouTube",
                      url: `https://youtube.com/@${username}`,
                      position: 2,
                    },
                  ],
                },
              },
              notificationSettings: {
                create: {},
              },
            },
          });

          const randomTitles = streamsData[randomCategory.slug];
          const randomTitle =
            randomTitles[Math.floor(Math.random() * randomTitles.length)];

          await tx.stream.create({
            data: {
              title: randomTitle,
              thumbnailUrl: `/streams/${createdUser.username}.webp`,
              user: {
                connect: {
                  id: createdUser.id,
                },
              },
              category: {
                connect: {
                  id: randomCategory.id,
                },
              },
            },
          });

          Logger.log(
            `Пользователь "${createdUser.username}" и его стри успешно созданы`,
          );
        }
      }
    });

    Logger.log("Заполнение БД завершено");
  } catch (error) {
    Logger.error(error);
    throw new BadRequestException("Ошибки при заполнении БД");
  } finally {
    Logger.log("Закрытие соединения с БД");
    await prisma.$disconnect();
    Logger.log("Соединения с БД закрыто");
  }
}

main();
