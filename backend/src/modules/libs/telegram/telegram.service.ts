import { Injectable } from "@nestjs/common";
import { Update } from "nestjs-telegraf";
import { Telegraf } from "telegraf";
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
}
