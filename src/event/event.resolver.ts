import { Fields } from '@/gql.decorator';
import { DefaultPaginationInput, PaginationInput } from '@/types';
import { Event, Gacha } from './event';
import { Args, Field, InputType, Query, Resolver } from '@nestjs/graphql';
import { EventService } from './event.service';
import { Inject } from '@nestjs/common';
import { IsOptional } from 'class-validator';

@InputType()
export class EventFilterInput {
  @Field((type) => Number, { nullable: true })
  @IsOptional()
  id?: number;
}

@InputType()
export class GachaFilterInput {
  @Field((type) => Number, { nullable: true })
  @IsOptional()
  id?: number;
}

@Resolver()
export class EventResolver {
  constructor(@Inject(EventService) private eventService: EventService) {}

  @Query(() => [Event])
  async event(
    @Args('filter', { nullable: true }) filter: EventFilterInput,
    @Args('page', { nullable: true, defaultValue: DefaultPaginationInput })
    page: PaginationInput,
    @Fields() fields: object,
  ) {
    return this.eventService.getEvent(filter, page, {
      episodeCharactersData: 'episodeCharactersData' in fields,
    });
  }

  @Query(() => [Gacha])
  async gacha(
    @Args('filter', { nullable: true }) filter: GachaFilterInput,
    @Args('page', { nullable: true, defaultValue: DefaultPaginationInput })
    page: PaginationInput,
    @Fields() fields: object,
  ) {
    return this.eventService.getGacha(filter, page, {
      pickUpCards: 'pickUpCards' in fields,
    });
  }
}
