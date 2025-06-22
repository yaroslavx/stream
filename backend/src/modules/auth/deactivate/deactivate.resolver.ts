import { Resolver } from '@nestjs/graphql';
import { DeactivateService } from './deactivate.service';

@Resolver('Deactivate')
export class DeactivateResolver {
  public constructor(private readonly deactivateService: DeactivateService) { }
}
