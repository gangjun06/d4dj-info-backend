import {
  Field,
  FieldMiddleware,
  InputType,
  MiddlewareContext,
  NextFn,
  registerEnumType,
} from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsOptional, Min } from 'class-validator';
import { CardSort } from './character/character.resolver';

@InputType()
export class PaginationInput {
  @Field((type) => Number, { nullable: true, defaultValue: 0 })
  @IsOptional()
  @Min(0)
  skip: number;

  @Field((type) => Number, { nullable: true, defaultValue: 20 })
  @IsOptional()
  @Min(0)
  take: number;
}

type enums = typeof CardSort;

@InputType()
export class DefaultSortInput<T extends enums> {
  @Field((type) => String)
  name: T;

  @Field((type) => Prisma.SortOrder, { nullable: true, defaultValue: 'asc' })
  order?: Prisma.SortOrder;
}

registerEnumType(Prisma.SortOrder, { name: 'SortOrder' });
