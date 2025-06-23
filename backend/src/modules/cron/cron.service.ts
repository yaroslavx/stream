import { Injectable } from '@nestjs/common';
import { MailService } from '../libs/mail/mail.service';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronService {
    public constructor(
        private readonly mailService: MailService,
        private readonly prismaService: PrismaService
    ) { }

    @Cron('0 0 * * *')
    public async deleteDeactivatedAccounts() {
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

        const deactivatedAccounts = await this.prismaService.user.findMany({
            where: {
                isDeactivated: true,
                deactivatedAt: {
                    lte: sevenDaysAgo
                }
            }
        })

        for (const user of deactivatedAccounts) {
            await this.mailService.sendAccountDeletion(user.email)
        }

        console.log(`Deleting ${deactivatedAccounts.length} deactivated accounts: ${deactivatedAccounts.map(user => user.email).join(", ")}`)

        await this.prismaService.user.deleteMany({
            where: {
                isDeactivated: true,
                deactivatedAt: {
                    lte: sevenDaysAgo
                }
            }
        })
    }
}
