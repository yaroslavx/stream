import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/src/core/prisma/prisma.service";

@Injectable()
export class StreamService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findAll() {
    const streams = await this.prismaService.stream.findMany({
      where: {
        user: {
          isDeactivated: false,
        },
      },
      include: {
        user: {
          where: { isDeactivated: false },
        },
      },
    });

    return streams;
  }
}
