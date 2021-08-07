import { Auth } from '@/user/user.decorator';
import { Inject, Query } from '@nestjs/common';
import {
  Args,
  Field,
  InputType,
  Mutation,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Resource, ResourceType } from './resource';
import { ResourceService } from './resource.service';

@InputType()
class ParseResourceInput {
  @Field((returns) => ResourceType, { nullable: false })
  target: ResourceType;
}

@Resolver(Resource)
export class ResourceResolver {
  constructor(
    @Inject(ResourceService) private resourceService: ResourceService,
  ) {}
  @ResolveField((returns) => [Resource])
  @Auth({ onlyAdmin: true })
  async resources() {}

  @Mutation((returns) => Boolean)
  @Auth({ onlyAdmin: true })
  async parseResource(@Args('data') data: ParseResourceInput) {
    await this.resourceService.getResources(data.target);
    return true;
  }
}