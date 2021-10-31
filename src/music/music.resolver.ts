import { PaginationInput } from '@/types';
import { Inject } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  InputType,
  Field,
  registerEnumType,
  ResolveField,
  Parent,
  ID,
} from '@nestjs/graphql';
import { Chart, ChartNoteCount, Music } from './music';
import { MusicService } from './music.service';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { Fields } from '@/gql.decorator';
import { MusicCategory, MusicSection, Prisma } from '@prisma/client';

@InputType()
export class MusicFilterInput {
  @Field((type) => Number, { nullable: true })
  @IsOptional()
  id?: number;

  @Field((type) => [Number], { nullable: true })
  @IsOptional()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  unit?: number[];

  @Field((type) => [MusicCategory], { nullable: true })
  @IsOptional()
  category?: MusicCategory[];
}

export enum MusicSort {
  id = 'id',
  name = 'name',
  defaultOrder = 'defaultOrder',
}

registerEnumType(MusicSort, { name: 'MusicSort' });

@InputType()
export class MusicSortInput {
  @Field((type) => MusicSort)
  name: MusicSort;

  @Field((type) => Prisma.SortOrder, { nullable: true, defaultValue: 'asc' })
  order?: Prisma.SortOrder;
}

@Resolver()
export class MusicResolver {
  constructor(@Inject(MusicService) private musicService: MusicService) {}

  @Query((returns) => [Music])
  async music(
    @Args('page', { nullable: true }) page: PaginationInput,
    @Args('filter', { nullable: true }) filter: MusicFilterInput,
    @Args('sort', { nullable: true }) order: MusicSortInput,
    @Fields() fields: object,
  ) {
    return this.musicService.getMusic(filter, order, page, {
      ...('chart' in fields && {
        chart: {
          include: {
            chartDesigner:
              //@ts-ignore
              'chartDesigner' in fields.chart.fieldsByTypeName.Chart,
          },
        },
      }),
      musicMix: 'musicMix' in fields,
      unit: 'unit' in fields,
    });
  }
}
