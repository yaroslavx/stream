import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { DeactivateService } from './deactivate.service';
import { GqlContext } from '@/src/shared/types/gql-context.types';
import { DeactivateAccountInput } from './inputs/deactivate-account.input';
import { UserAgent } from '@/src/shared/decorators/user-agent.decorator';
import { Authorized } from '@/src/shared/decorators/authorized.decorator';
import type { User } from '@/prisma/generated';
import { Authorization } from '@/src/shared/decorators/auth.decorator';
import { AuthModel } from '../account/models/auth.model';

@Resolver('Deactivate')
export class DeactivateResolver {
  public constructor(private readonly deactivateService: DeactivateService) { }

  @Authorization()
  @Mutation(() => AuthModel, { name: 'deactivateAccount' })
  public async deactivate(
    @Context() { req }: GqlContext,
    @Args('data') input: DeactivateAccountInput,
    @Authorized() user: User,
    @UserAgent() userAgent: string
  ) {
    return this.deactivateService.deactivate(req, input, user, userAgent)
  }
}
