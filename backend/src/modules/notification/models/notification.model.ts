import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { type Notification, NotificationType } from "@prisma/generated";
import { UserModel } from "@/src/modules/auth/account/models/user.model";

registerEnumType(NotificationType, {
  name: "Notification",
});

@ObjectType()
export class NotificationModel implements Notification {
  @Field(() => String)
  public id: string;

  @Field(() => String)
  public message: string;

  @Field(() => NotificationType)
  public type: NotificationType;

  @Field(() => Boolean)
  public isRead: boolean;

  @Field(() => UserModel)
  public user: UserModel;

  @Field(() => String)
  public userId: string;

  @Field(() => Date)
  public createdAt: Date;

  @Field(() => Date)
  public updatedAt: Date;
}
