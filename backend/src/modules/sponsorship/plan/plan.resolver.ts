import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PlanService } from "./plan.service";
import { Authorized } from "@/src/shared/decorators/authorized.decorator";
import type { User } from "@prisma/generated";
import { PlanModel } from "@/src/modules/sponsorship/plan/models/plan.model";
import { Authorization } from "@/src/shared/decorators/auth.decorator";
import { CreatePlanInput } from "@/src/modules/sponsorship/plan/inputs/create-plan.input";

@Resolver("Plan")
export class PlanResolver {
  public constructor(private readonly planService: PlanService) {}

  @Authorization()
  @Query(() => [PlanModel], { name: "findMySponsorshipPlans" })
  public async findMyPlans(@Authorized() user: User) {
    return this.planService.findMyPlans(user);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: "createSponsorshipPlan" })
  public async create(
    @Authorized() user: User,
    @Args("data") input: CreatePlanInput,
  ) {
    return this.planService.create(user, input);
  }

  @Authorization()
  @Mutation(() => Boolean, { name: "removeSponsorshipPlan" })
  public async remove(@Args("planId") planId: string) {
    return this.planService.remove(planId);
  }
}
