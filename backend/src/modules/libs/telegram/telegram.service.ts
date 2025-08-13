import { Injectable } from "@nestjs/common";
import { Ctx, Start, Update } from "nestjs-telegraf";
import { Telegraf } from "telegraf";
import { PrismaService } from "@/src/core/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { $Enums } from "@prisma/generated";
import TokenType = $Enums.TokenType;

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

      const hasExpired = new Date(authToken.expiresIn) < new Date();

      if (!authToken) {
        return ctx.reply("Невалидный токен");
      }

      await this.connectTelegram(authToken.userId, chatId);

      await this.prismaService.token.delete({
        where: {
          id: authToken.id,
        },
      });

      await ctx.replyWithHTML("Успешная авторизация");
    }
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
}
