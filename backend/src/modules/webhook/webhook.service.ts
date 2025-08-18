import { PrismaService } from "@/src/core/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { LivekitService } from "../libs/livekit/livekit.service";
import { NotificationService } from "@/src/modules/notification/notification.service";
import { TelegramService } from "@/src/modules/libs/telegram/telegram.service";
import Stripe from "stripe";
import { TransactionStatus } from "@prisma/generated";

@Injectable()
export class WebhookService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly livekitService: LivekitService,
    private readonly notificationService: NotificationService,
    private readonly telegramService: TelegramService,
  ) {}

  public async receiveWebhookLivekit(body: string, authorization: string) {
    const event = this.livekitService.receiver.receive(
      body,
      authorization,
      true,
    );

    if (event.event === "ingress_started") {
      const stream = await this.prismaService.stream.update({
        where: {
          ingressId: event.ingressInfo.ingressId,
        },
        data: {
          isLive: true,
        },
        include: {
          user: true,
        },
      });

      const follows = await this.prismaService.follow.findMany({
        where: {
          followingId: stream.user.id,
          follower: {
            isDeactivated: false,
          },
        },
        include: {
          follower: {
            include: {
              notificationSettings: true,
            },
          },
        },
      });

      for (const follow of follows) {
        const follower = follow.follower;

        if (follower.notificationSettings.siteNotifications) {
          await this.notificationService.createStreamStart(
            follower.id,
            stream.user,
          );
        }

        if (
          follower.notificationSettings.telegramNotifications &&
          follower.telegramId
        ) {
          await this.telegramService.sendStreamStart(
            follower.telegramId,
            stream.user,
          );
        }
      }
    }

    if (event.event === "ingress_ended") {
      const stream = await this.prismaService.stream.update({
        where: {
          ingressId: event.ingressInfo.ingressId,
        },
        data: {
          isLive: false,
        },
      });

      await this.prismaService.chatMessage.deleteMany({
        where: {
          streamId: stream.id,
        },
      });
    }
  }

  public async receiveWebhookStripe(event: Stripe.Event) {
    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
      const planId = session.metadata.planId;
      const userId = session.metadata.userId;
      const channelId = session.metadata.channelId;

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDay() + 30);

      const sponsorshipSubscription =
        await this.prismaService.sponsorshipSubscription.create({
          data: {
            expiresAt,
            planId,
            userId,
            channelId,
          },
          include: {
            plan: true,
            user: true,
            channel: {
              include: {
                notificationSettings: true,
              },
            },
          },
        });

      await this.prismaService.transaction.updateMany({
        where: {
          stripeSubscriptionId: session.id,
          status: TransactionStatus.PENDING,
        },
        data: {
          status: TransactionStatus.SUCCESS,
        },
      });

      if (
        sponsorshipSubscription.channel.notificationSettings.siteNotifications
      ) {
        await this.notificationService.createNewSponsorship(
          sponsorshipSubscription.channel.id,
          sponsorshipSubscription.plan,
          sponsorshipSubscription.user,
        );
      }

      if (
        sponsorshipSubscription.channel.notificationSettings
          .telegramNotifications &&
        sponsorshipSubscription.channel.telegramId
      ) {
        await this.telegramService.sendNewSponsorship(
          sponsorshipSubscription.channel.id,
          sponsorshipSubscription.plan,
          sponsorshipSubscription.user,
        );
      }
    }
  }
}
