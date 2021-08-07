import { Fields } from '@/gql.decorator';
import { PaginationInput } from '@/types';
import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, InputType, Field } from '@nestjs/graphql';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Attribute } from '@prisma/client';
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
  @ArrayMaxSize(10)
  unit?: number[];
}

@Resolver('character')
export class CharacterResolver {
  constructor(
    @Inject(CharacterService) private characterService: CharacterService,
  ) {}

  @Query(() => [Unit])
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
    @Args('page', { nullable: true, defaultValue: { take: 20, skip: 0 } })
    page: PaginationInput,
    @Fields() fields: object,
  ) {
    //@ts-ignore
    return this.characterService.getCard(filter, page, {
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
      skill: 'skilll' in fields,
    });
  }
}
