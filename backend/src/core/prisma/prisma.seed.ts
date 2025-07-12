import { BadRequestException, Logger } from "@nestjs/common";
import { PrismaClient } from "../../../prisma/generated";

const prisma = new PrismaClient();

async function main() {
  try {
    Logger.log("Начало заполнения БД");

    await prisma.$transaction([
      prisma.user.deleteMany(),
      prisma.socialLink.deleteMany(),
      prisma.stream.deleteMany(),
      prisma.category.deleteMany(),
    ]);
  } catch (error) {
    Logger.log(error);
    throw new BadRequestException("Ошибки при заполнении БД");
  } finally {
    Logger.log("Закрытие соединения с БД");
    await prisma.$disconnect();
    Logger.log("Соединения с БД закрыто");
  }
}

main();
