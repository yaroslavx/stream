import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/src/core/prisma/prisma.service";
import { $Enums, User } from "@prisma/generated";
import { ChangeNotificationSettingsInput } from "@/src/modules/notification/inputs/change-notification-settings.input";
import { generateToken } from "@/src/shared/utils/generate-token.util";
import TokenType = $Enums.TokenType;

@Injectable()
export class NotificationService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findUnreadCount(user: User) {
    const count = await this.prismaService.notification.count({
      where: {
        isRead: false,
        userId: user.id,
      },
    });

    return count;
  }

  public async findByUser(user: User) {
    await this.prismaService.notification.updateMany({
      where: {
        isRead: false,
        userId: user.id,
      },
      data: {
        isRead: true,
      },
    });

    const notifications = await this.prismaService.notification.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return notifications;
  }

  public async changeSettings(
    user: User,
    input: ChangeNotificationSettingsInput,
  ) {
    const { siteNotifications, telegramNotifications } = input;

    const notificationSettings =
      await this.prismaService.notificationSetting.update({
        where: {
          userId: user.id,
        },
        data: {
          siteNotifications,
          telegramNotifications,
        },
        include: {
          user: true,
        },
      });

    if (
      notificationSettings.telegramNotifications &&
      !notificationSettings.user.telegramId
    ) {
      const telegramAuthToken = await generateToken(
        this.prismaService,
        user,
        TokenType.TELEGRAM_AUTH,
      );

      return { notificationSettings, telegramAuthToken };
    }

    if (
      !notificationSettings.telegramNotifications &&
      notificationSettings.user.telegramId
    ) {
      await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          telegramId: null,
        },
      });

      return { notificationSettings };
    }

    return { notificationSettings };
  }
}
