import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TransactionService } from "./transaction.service";
import { TransactionModel } from "@/src/modules/sponsorship/transaction/models/transaction.model";
import { Authorization } from "@/src/shared/decorators/auth.decorator";
import { Authorized } from "@/src/shared/decorators/authorized.decorator";
import { User } from "@prisma/generated";
import { MakePaymentModel } from "@/src/modules/sponsorship/transaction/models/make-payment.model";

@Resolver("Transaction")
export class TransactionResolver {
  public constructor(private readonly transactionService: TransactionService) {}

  @Authorization()
  @Query(() => [TransactionModel], { name: "findMyTransactions" })
  public async findMyTransaction(@Authorized() user: User) {
    return this.transactionService.findMyTransactions(user);
  }

  @Authorization()
  @Mutation(() => MakePaymentModel, { name: "makePayment" })
  public async makePayment(
    @Authorized() user: User,
    @Args("planId") planId: string,
  ) {
    return this.transactionService.makePayment(user, planId);
  }
}
