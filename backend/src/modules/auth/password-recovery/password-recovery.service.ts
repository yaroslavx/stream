import { PrismaService } from '@/src/core/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { MailService } from '../../libs/mail/mail.service';
import type { Request } from 'express';
import { ResetPasswordInput } from './inputs/reset-password.input';
import { generateToken } from '@/src/shared/utils/generate-token.util';
import { TokenType } from '@/prisma/generated';

@Injectable()
export class PasswordRecoveryService {
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly mailService: MailService
    ) { }

    public async resetPassword(req: Request, input: ResetPasswordInput, userAgent: string) {
        const { email } = input

        const user = await this.prismaService.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            throw new NotFoundException("Пользователь не найден")
        }

        const resetToken = await generateToken(this.prismaService, user, TokenType.PASSWORD_RESET)

        return true
    }
}
