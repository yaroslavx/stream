import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { IS_DEV_ENV } from "src/shared/utils/is-dev.util";
import { GraphQLModule } from "@nestjs/graphql";
import { getGraphQLConfig } from "./config/graphql.config";
import { ApolloDriver } from "@nestjs/apollo";
import { RedisModule } from "./redis/redis.module";
import { AccountModule } from "../modules/auth/account/account.module";
import { SessionModule } from "../modules/auth/session/session.module";
import { VerificationModule } from "../modules/auth/verification/verification.module";
import { MailModule } from "../modules/libs/mail/mail.module";
import { PasswordRecoveryModule } from "../modules/auth/password-recovery/password-recovery.module";
import { TotpModule } from "../modules/auth/totp/totp.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: getGraphQLConfig,
      inject: [ConfigService],
    }),
    PrismaModule,
    RedisModule,
    MailModule,
    AccountModule,
    SessionModule,
    VerificationModule,
    PasswordRecoveryModule,
    TotpModule,
  ],
})
export class CoreModule { }
