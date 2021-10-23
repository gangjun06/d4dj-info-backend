import { PaginationInput } from '@/types';
import { Inject } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  InputType,
  Field,
  registerEnumType,
} from '@nestjs/graphql';
import { Music } from './music';
import { MusicService } from './music.service';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { Fields } from '@/gql.decorator';
import { Prisma } from '@prisma/client';

@InputType()
export class MusicFilterInput {
  @Field((type) => [Number], { nullable: true })
  @IsOptional()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  unit?: number[];
}

export enum MusicSort {
  id = 'id',
  name = 'name',
}

registerEnumType(MusicSort, { name: 'MusicSort' });

@InputType()
export class MusicSortInput {
  @Field((type) => MusicSort)
  name: MusicSort;

  @Field((type) => Prisma.SortOrder, { nullable: true, defaultValue: 'asc' })
  order?: Prisma.SortOrder;
}

@Resolver('music')
export class MusicResolver {
  constructor(@Inject(MusicService) private musicService: MusicService) {}

  @Query(() => [Music])
  async music(
    @Args('page', { nullable: true }) page: PaginationInput,
    @Args('filter', { nullable: true }) filter: MusicFilterInput,
    @Args('sort', { nullable: true }) order: MusicSortInput,
    @Fields() fields: object,
  ) {
    return [];
  }
}
