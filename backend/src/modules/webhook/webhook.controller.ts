import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  Headers,
  RawBody,
} from "@nestjs/common";
import { WebhookService } from "./webhook.service";

@Controller("webhook")
export class WebhookController {
  public constructor(private readonly webhookService: WebhookService) {}

  @Post("livekit")
  @HttpCode(HttpStatus.OK)
  public async receiveWebhookLivekit(
    @Body() body: string,
    @Headers("Authorization") authorization: string,
  ) {
    if (!authorization) {
      throw new UnauthorizedException("Отсутсвует заголовок авторизации");
    }

    return this.webhookService.receiveWebhookLivekit(body, authorization);
  }

  @Post("stripe")
  @HttpCode(HttpStatus.OK)
  public async receiveWebhookStripe(
    @RawBody() rawBody: string,
    @Headers("stripe-signature") stripeSignature: string,
  ) {
    if (!stripeSignature) {
      throw new UnauthorizedException("Отсутствует подпись Stripe в заголовке");
    }

    const event = this.webhookService.constructStripeEvent(
      rawBody,
      stripeSignature,
    );

    await this.webhookService.receiveWebhookStripe(event);
  }
}
