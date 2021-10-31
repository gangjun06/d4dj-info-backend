import { Fields } from '@/gql.decorator';
import { DefaultPaginationInput, PaginationInput } from '@/types';
import { Event } from './event';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class EventResolver {
  @Query(() => [Event])
  async event(
    @Args('page', { nullable: true, defaultValue: DefaultPaginationInput })
    page: PaginationInput,
    @Fields() fields: object,
  ) {
    return [];
    //     return this.characterService.getCharacter(filter, page, {})
  }
}
