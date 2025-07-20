import { PrismaService } from "@/src/core/prisma/prisma.service";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { SendMessageInput } from "./inputs/send-message.input";
import { User } from "@/prisma/generated";
import { ChangeChatSettingsInput } from "./inputs/change-chat-setting.input";

@Injectable()
export class ChatService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findByStream(streamId: string) {
    const messages = await this.prismaService.chatMessage.findMany({
      where: {
        streamId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    return messages;
  }

  public async sendMessage(userId: string, input: SendMessageInput) {
    const { text, streamId } = input;

    const stream = await this.prismaService.stream.findUnique({
      where: { id: streamId },
    });

    if (!stream) {
      throw new NotFoundException("Стрим не найден");
    }

    if (!stream.isLive) {
      throw new BadRequestException("Стрим не режиме живого вещания");
    }

    const message = await this.prismaService.chatMessage.create({
      data: {
        text: text,
        user: {
          connect: {
            id: userId,
          },
        },
        stream: {
          connect: {
            id: stream.id,
          },
        },
      },
      include: {
        stream: true,
      },
    });

    return message;
  }

  public async changeSettings(user: User, input: ChangeChatSettingsInput) {
    const { isChatEnabled, isChatFollowersOnly, isChatPremiumFollowersOnly } =
      input;

    await this.prismaService.stream.update({
      where: {
        userId: user.id,
      },
      data: {
        isChatEnabled,
        isChatFollowersOnly,
        isChatPremiumFollowersOnly,
      },
    });

    return true;
  }
}
