import { Injectable } from "@nestjs/common";
import { Ctx, Start, Update } from "nestjs-telegraf";
import { Context, Telegraf } from "telegraf";
import { PrismaService } from "@/src/core/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";

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
  public async onStart(@Ctx() ctx: Context) {
    const username = ctx.message.from.username;

    await ctx.replyWithHTML(`Привет, ${username}`);
  }
}
