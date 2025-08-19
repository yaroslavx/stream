import { Query, Resolver } from "@nestjs/graphql";
import { SubscriptionService } from "./subscription.service";
import { SubscriptionModel } from "@/src/modules/sponsorship/subscription/models/subscription.model";
import { Authorized } from "@/src/shared/decorators/authorized.decorator";
import { User } from "@prisma/generated";
import { Authorization } from "@/src/shared/decorators/auth.decorator";

@Resolver("Subscription")
export class SubscriptionResolver {
  public constructor(
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Authorization()
  @Query(() => [SubscriptionModel], { name: "findMySponsors" })
  public async findMySponsors(@Authorized() user: User) {
    return this.subscriptionService.findMySponsors(user);
  }
}
