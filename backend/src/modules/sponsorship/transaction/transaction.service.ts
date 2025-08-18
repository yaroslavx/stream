import { PrismaService } from "@/src/core/prisma/prisma.service";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { StripeService } from "@/src/modules/libs/stripe/stripe.service";
import { User } from "@prisma/generated";

@Injectable()
export class TransactionService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly stripeService: StripeService,
  ) {}

  public async findMyTransactions(user: User) {
    const transactions = await this.prismaService.transaction.findMany({
      where: {
        userId: user.id,
      },
    });

    return transactions;
  }

  public async makePayment(user: User, planId: string) {
    const plan = await this.prismaService.sponsorshipPlan.findUnique({
      where: {
        id: planId,
      },
      include: {
        channel: true,
      },
    });

    if (!plan) {
      throw new NotFoundException("План не найден");
    }

    if (user.id === plan.channel.id) {
      throw new ConflictException(
        "Вы не можете оформить спорсорство сами на себя",
      );
    }

    const existingSubscription =
      await this.prismaService.sponsorshipSubscription.findFirst({
        where: {
          userId: user.id,
          channelId: plan.channel.id,
        },
      });

    if (existingSubscription) {
      throw new ConflictException("Вы уже оформили спонсорство на этот канал");
    }

    const customer = await this.stripeService.customers.create({
      name: user.username,
      email: user.email,
    });

    const session = await this.stripeService.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "rub",
            product_data: {
              name: plan.title,
            },
            unit_amount: Math.round(plan.price * 100),
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${this.configService.getOrThrow<string>("ALLOWED_ORIGIN")}/success?plan=${encodeURIComponent(plan.title)}&username=${encodeURIComponent(plan.channel.username)}`,
      cancel_url: this.configService.getOrThrow<string>("ALLOWED_ORIGIN"),
      customer: customer.id,
      metadata: {
        planId: plan.id,
        userId: user.id,
        channelId: plan.channel.id,
      },
    });

    await this.prismaService.transaction.create({
      data: {
        amount: plan.price,
        currency: session.currency,
        stripeSubscriptionId: session.id,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return {
      url: session.url,
    };
  }
}
