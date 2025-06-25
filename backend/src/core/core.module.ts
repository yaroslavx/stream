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
import { DeactivateModule } from "../modules/auth/deactivate/deactivate.module";
import { CronModule } from "../modules/cron/cron.module";
import { StorageModule } from "../modules/libs/storage/storage.module";

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
    StorageModule,
    CronModule,
    AccountModule,
    SessionModule,
    VerificationModule,
    PasswordRecoveryModule,
    TotpModule,
    DeactivateModule,
  ],
})
export class CoreModule { }
