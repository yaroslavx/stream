import { Injectable } from "@nestjs/common";
import { Command, Ctx, Start, Update } from "nestjs-telegraf";
import { Context, Telegraf } from "telegraf";
import { PrismaService } from "@/src/core/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { $Enums } from "@prisma/generated";
import TokenType = $Enums.TokenType;
import { MESSAGES } from "./telegram.messages";
import { BUTTONS } from "@/src/modules/libs/telegram/telegram.button";

@Update()
@Injectable()
export class TelegramService extends Telegraf {
  private readonly _token: string;

  public constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {
    super(configService.getOrThrow<string>("TELEGRAM_BOT_TOKEN"));
    this._token = this.configService.getOrThrow<string>("TELEGRAM_BOT_TOKEN");
  }

  @Start()
  public async onStart(@Ctx() ctx: any) {
    const chatId = ctx.chat.id.toString();
    const token = ctx.message.text.split(" ")[1];

    if (token) {
      const authToken = await this.prismaService.token.findUnique({
        where: {
          token,
          type: TokenType.TELEGRAM_AUTH,
        },
      });

      if (!authToken) {
        await ctx.reply(MESSAGES.invalidToken);
      }

      const hasExpired = new Date(authToken.expiresIn) < new Date();

      if (hasExpired) {
        await ctx.reply(MESSAGES.invalidToken);
      }

      await this.connectTelegram(authToken.userId, chatId);

      await this.prismaService.token.delete({
        where: {
          id: authToken.id,
        },
      });

      await ctx.replyWithHTML(MESSAGES.authSuccess, BUTTONS.authSuccess);
    }

    const user = await this.findUserByChatId(chatId);

    if (user) {
      return await this.onMe(ctx);
    } else {
      await ctx.replyWithHTML(MESSAGES.welcome, BUTTONS.profile);
    }
  }

  @Command("me")
  public async onMe(@Ctx() ctx: Context) {
    const chatId = ctx.chat.id.toString();

    const user = await this.findUserByChatId(chatId);
    const followersCount = await this.prismaService.follow.count({
      where: {
        followingId: user.id,
      },
    });

    await ctx.replyWithHTML(
      MESSAGES.profile(user, followersCount),
      BUTTONS.profile,
    );
  }

  private async connectTelegram(userId: string, chatId: string) {
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        telegramId: chatId,
      },
    });
  }

  private async findUserByChatId(chatId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        telegramId: chatId,
      },
      include: {
        followers: true,
        followings: true,
      },
    });

    return user;
  }
}
