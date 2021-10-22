import { PaginationInput } from '@/types';
import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, InputType, Field } from '@nestjs/graphql';
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

@InputType()
export class MusicFilterInput {
  @Field((type) => [Number], { nullable: true })
  @IsOptional()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  unit?: number[];
}
@InputType()
export class MusicOrderInput {
  @Field((type) => [Number], { nullable: true })
  @IsOptional()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  unit?: number[];
}

@Resolver('music')
export class MusicResolver {
  constructor(@Inject(MusicService) private musicService: MusicService) {}

  //   @Query(() => [Music])
  //   async music(
  //     @Args('page', { nullable: true }) page: PaginationInput,
  //     @Args('filter', { nullable: true }) filter: MusicFilterInput,
  //     @Args('order', { nullable: true }) order: MusicOrderInput,
  //     @Fields() fields: object,
  //   ) {
  //     return [];
  //   }
}
