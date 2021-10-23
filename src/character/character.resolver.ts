import { Fields } from '@/gql.decorator';
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
import { FilesInterceptor } from '@nestjs/platform-express';
import { Attribute, Prisma } from '@prisma/client';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { Card, Character, Unit } from './character';
import { CharacterService } from './character.service';

@InputType()
export class CharacterFilterInput {
  @Field({ nullable: true })
  @IsOptional()
  @Min(0)
  @Max(100)
  unit?: number;
}

@InputType()
export class CardFilterInput {
  @Field((type) => Attribute, { nullable: true })
  @IsOptional()
  attribute?: Attribute;

  @Field((type) => [Number], { nullable: true })
  @IsOptional()
  @ArrayMinSize(1)
  @ArrayMaxSize(4)
  rairity?: number[];

  @Field((type) => [Number], { nullable: true })
  @IsOptional()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  unit?: number[];
}

export enum CardSort {
  id = 'id',
  name = 'name',
}

@InputType()
export class CardSortInput {
  @Field((type) => CardSort)
  name: CardSort;

  @Field((type) => Prisma.SortOrder, { nullable: true, defaultValue: 'asc' })
  order?: Prisma.SortOrder;
}

registerEnumType(CardSort, { name: 'cardSort' });

@Resolver('character')
export class CharacterResolver {
  constructor(
    @Inject(CharacterService) private characterService: CharacterService,
  ) {}

  @Query((returns) => [Unit])
  async unit(
    @Args('page', { nullable: true }) page: PaginationInput,
    @Fields() fields: object,
  ) {
    return this.characterService.getUnit(page, {
      characters: 'characters' in fields,
    });
  }

  @Query(() => [Character])
  async character(
    @Args('filter', { nullable: true }) filter: CharacterFilterInput,
    @Args('page', { nullable: true }) page: PaginationInput,
    @Fields() fields: object,
  ) {
    return this.characterService.getCharacter(page, {
      card: 'card' in fields,
      unit: 'unit' in fields,
    });
  }

  @Query(() => [Card])
  async card(
    @Args('filter', { nullable: true }) filter: CardFilterInput,
    @Args('sort', { type: () => CardSortInput, nullable: true })
    order: CardSortInput,
    @Args('page', { nullable: true, defaultValue: { take: 20, skip: 0 } })
    page: PaginationInput,
    @Fields() fields: object,
  ) {
    return this.characterService.getCard(filter, order, page, {
      ...('character' in fields
        ? {
            character: {
              include: {
                //@ts-ignore
                unit: 'unit' in fields.character.fieldsByTypeName.Character,
              },
            },
          }
        : {}),
      skill: 'skill' in fields,
    });
  }
}
