import { PrismaService } from "@/src/core/prisma/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ChannelService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findRecommended() {
    const channels = await this.prismaService.user.findMany({
      where: {
        isDeactivated: false,
      },
      orderBy: {
        followers: {
          _count: "desc",
        },
      },
      include: {
        stream: true,
      },
      take: 7,
    });

    return channels;
  }

  public async findByUsername(username: string) {
    const channel = await this.prismaService.user.findUnique({
      where: {
        username,
        isDeactivated: false,
      },
      include: {
        socialLinks: {
          orderBy: {
            position: "asc",
          },
        },
        stream: {
          include: {
            category: true,
          },
        },
        followings: true,
      },
    });

    if (!channel) {
      throw new NotFoundException("Канал не найден");
    }

    return channel;
  }

  public async findFollowersCountByChannel(channelId: string) {
    const count = await this.prismaService.follow.count({
      where: {
        following: {
          id: channelId,
        },
      },
    });

    return count;
  }
}
