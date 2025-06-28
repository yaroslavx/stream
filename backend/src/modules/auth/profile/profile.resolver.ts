import { Args, Mutation, Resolver } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs'
import * as Upload from 'graphql-upload/Upload.mjs'
import { ProfileService } from './profile.service';
import { Authorized } from '@/src/shared/decorators/authorized.decorator';
import type { User } from '@/prisma/generated';
import { Authorization } from '@/src/shared/decorators/auth.decorator';

@Resolver('Profile')
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) { }

  @Authorization()
  @Mutation(() => Boolean, { name: 'changeProfileAvatar' })
  public async changeAvatar(@Authorized() user: User, @Args('avatar', { type: () => GraphQLUpload }) avatar: Upload) {
    this.profileService.changeAvatar(user, avatar)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'removeProfileAvatar' })
  public async removeAvatar(@Authorized() user: User) {
    this.profileService.removeAvatar(user)
  }
}
