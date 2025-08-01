import { PrismaService } from "@/src/core/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { LivekitService } from "../libs/livekit/livekit.service";
import { NotificationService } from "@/src/modules/notification/notification.service";

@Injectable()
export class WebhookService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly livekitService: LivekitService,
    private readonly notificationService: NotificationService,
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
}
