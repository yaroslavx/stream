import { PrismaService } from '@/src/core/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './inputs/create-user.input';
import { hash } from 'argon2';
import { VerificationService } from '../verification/verification.service';

@Injectable()
export class AccountService {
    public constructor(private readonly prismaService: PrismaService, private readonly verificationService: VerificationService) { }

    public async me(id: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id
            }
        })

        return user
    }

    public async create(input: CreateUserInput) {
        const { email, password, username } = input

        const isUsernameExists = await this.prismaService.user.findUnique({
            where: {
                username
            }
        })

        if (isUsernameExists) {
            throw new Error('Это имя пользователя уже занято')
        }

        const isEmailExists = await this.prismaService.user.findUnique({
            where: {
                email
            }
        })

        if (isEmailExists) {
            throw new Error('Эта почта уже занята')
        }

        const user = await this.prismaService.user.create({
            data: {
                username,
                email,
                password: await hash(password),
                displayName: username,
            }
        })

        await this.verificationService.sendVerificationToken(user)

        return true
    }
}
