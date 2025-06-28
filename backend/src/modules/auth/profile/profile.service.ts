import { PrismaService } from '@/src/core/prisma/prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { StorageService } from '../../libs/storage/storage.service';
import { User } from '@/prisma/generated';
import Upload from 'graphql-upload/Upload.mjs';
import * as sharp from 'sharp';
import { ChangeProfileInfoInput } from './inputs/change-profile-info.input';

@Injectable()
export class ProfileService {
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly storageService: StorageService,
    ) { }

    public async changeAvatar(user: User, { file }: Upload) {
        if (user.avatar) {
            await this.storageService.remove(user.avatar);
        }

        const chunks: Buffer[] = []

        for await (const chunk of file.createReadStream()) {
            chunks.push(chunk)
        }

        const buffer = Buffer.concat(chunks);

        const filename = `/channels/${user.username}.webp`

        if (file.filename && file.filename.endsWith('.gif')) {
            const processedBuffer = await sharp(buffer, { animated: true }).resize(512, 512).webp().toBuffer();

            await this.storageService.upload(processedBuffer, filename, 'image/webp')
        } else {
            const processedBuffer = await sharp(buffer).resize(512, 512).webp().toBuffer();

            await this.storageService.upload(processedBuffer, filename, 'image/webp')
        }

        await this.prismaService.user.update({
            where: { id: user.id },
            data: { avatar: filename }
        })

        return true
    }

    public async removeAvatar(user: User) {
        if (!user.avatar) {
            return
        }

        await this.storageService.remove(user.avatar)

        await this.prismaService.user.update({
            where: { id: user.id },
            data: { avatar: null }
        })

        return true
    }

    public async changeInfo(user: User, input: ChangeProfileInfoInput) {
        const { username, displayName, bio } = input

        const usernameExists = await this.prismaService.user.findUnique({
            where: {
                username
            }
        })

        if (usernameExists && username !== user.username) {
            throw new ConflictException('Имя пользователя уже занято')
        }

        await this.prismaService.user.update({
            where: { id: user.id },
            data: { username, displayName, bio }
        })

        return true
    }
}
