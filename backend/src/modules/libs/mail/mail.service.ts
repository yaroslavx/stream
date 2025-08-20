import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { render } from "@react-email/components";
import { VerificationTemplate } from "./templates/verification.template";
import { PasswordRecoveryTemplate } from "./templates/password-recovery.tamplate";
import type { SessionMetadata } from "@/src/shared/types/session-metadata.type";
import { DeactivateTemplate } from "./templates/deactivate.template";
import { AccountDeletionTemplate } from "./templates/account-deletion.template";
import { EnableTwoFactorTemplate } from "@/src/modules/libs/mail/templates/enable-two-factor.template";
import { VerifyChannelTemplate } from "@/src/modules/libs/mail/templates/verify-channel.template";

@Injectable()
export class MailService {
  public constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  public async sendVerificationToken(email: string, token: string) {
    const domain = this.configService.getOrThrow<string>("ALLOWED_ORIGIN");
    const html = await render(VerificationTemplate({ domain, token }));

    return this.sendMail(email, "Подтверждение аккаунта", html);
  }

  public async sendPasswordResetToken(
    email: string,
    token: string,
    metadata: SessionMetadata,
  ) {
    const domain = this.configService.getOrThrow<string>("ALLOWED_ORIGIN");
    const html = await render(
      PasswordRecoveryTemplate({ domain, token, metadata }),
    );

    return this.sendMail(email, "Сброс пароля", html);
  }

  public async sendDeactivateToken(
    email: string,
    token: string,
    metadata: SessionMetadata,
  ) {
    const html = await render(DeactivateTemplate({ token, metadata }));

    return this.sendMail(email, "Деактивация учетной записи", html);
  }

  public async sendAccountDeletion(email: string) {
    const domain = this.configService.getOrThrow<string>("ALLOWED_ORIGIN");
    const html = await render(AccountDeletionTemplate({ domain }));

    return this.sendMail(email, "Аккаунт удален", html);
  }

  public async sendEnableTwoFactor(email: string) {
    const domain = this.configService.getOrThrow<string>("ALLOWED_ORIGIN");
    const html = await render(EnableTwoFactorTemplate({ domain }));

    return this.sendMail(email, "Обеспечьте свою безопасность", html);
  }

  public async sendVerifyChannel(email: string) {
    const html = await render(VerifyChannelTemplate());

    return this.sendMail(email, "Ваш канал верифицирован", html);
  }

  private sendMail(email: string, subject: string, html: string) {
    return this.mailerService.sendMail({
      to: email,
      subject,
      html,
    });
  }
}
