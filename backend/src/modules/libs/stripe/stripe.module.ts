import { type DynamicModule, Module } from "@nestjs/common";
import {
  StripeOptionsSymbol,
  TypeStripeAsyncOptions,
  TypeStripeOptions,
} from "@/src/modules/libs/stripe/types/stripe.types";
import { StripeService } from "@/src/modules/libs/stripe/stripe.service";

@Module({})
export class StripeModule {
  public static register(options: TypeStripeOptions): DynamicModule {
    return {
      module: StripeModule,
      providers: [
        {
          provide: StripeOptionsSymbol,
          useValue: options,
        },
        StripeService,
      ],
      exports: [StripeService],
      global: true,
    };
  }

  public static registerAsync(options: TypeStripeAsyncOptions): DynamicModule {
    return {
      module: StripeModule,
      imports: options.imports || [],
      providers: [
        {
          provide: StripeOptionsSymbol,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        StripeService,
      ],
      exports: [StripeService],
      global: true,
    };
  }
}
