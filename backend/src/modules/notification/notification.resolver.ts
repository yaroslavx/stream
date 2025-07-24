import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { NotificationService } from "./notification.service";
import { Authorized } from "@/src/shared/decorators/authorized.decorator";
import type { User } from "@prisma/generated";
import { NotificationModel } from "@/src/modules/notification/models/notification.model";
import { Authorization } from "@/src/shared/decorators/auth.decorator";
import { ChangeNotificationSettingsInput } from "@/src/modules/notification/inputs/change-notification-settings.input";
import { ChangeNotificationSettingsResponse } from "@/src/modules/notification/models/notification-settings.model";

@Resolver("Notification")
export class NotificationResolver {
  public constructor(
    private readonly notificationService: NotificationService,
  ) {}

  @Authorization()
  @Query(() => Number, { name: "findNotificationsUnreadCount" })
  public async findUnreadCount(@Authorized() user: User) {
    return this.notificationService.findUnreadCount(user);
  }

  @Authorization()
  @Query(() => [NotificationModel], { name: "findNotificationsByUser" })
  public async findByUser(@Authorized() user: User) {
    return this.notificationService.findByUser(user);
  }

  @Authorization()
  @Mutation(() => ChangeNotificationSettingsResponse, {
    name: "changeNotificationSettings",
  })
  public async changeSettings(
    @Authorized() user: User,
    @Args("data") input: ChangeNotificationSettingsInput,
  ) {
    return this.notificationService.changeSettings(user, input);
  }
}
