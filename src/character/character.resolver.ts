import { Fields } from '@/gql.decorator';
import { PaginationInput } from '@/types';
import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, InputType, Field } from '@nestjs/graphql';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Attribute } from '@prisma/client';
import { Card, Character, Unit } from './character';
import { CharacterService } from './character.service';

@InputType()
export class UnitFilterInput {
  @Field({ defaultValue: -1 })
  id?: number;
}

@InputType()
export class CharacterFilterInput {
  @Field({ defaultValue: -1 })
  id?: number;
}

@InputType()
export class CardFilterInput {
  @Field({ defaultValue: -1 })
  id?: number;

  @Field({ nullable: true })
  attribute?: Attribute;
}

@Resolver('character')
export class CharacterResolver {
  constructor(
    @Inject(CharacterService) private characterService: CharacterService,
  ) {}

  @Query(() => [Unit])
  async unit(
    @Args('filter', { nullable: true }) filter: UnitFilterInput,
    @Args('page', { nullable: true }) page: PaginationInput,
    @Fields() fields: object,
  ) {
    return this.characterService.getUnit(filter.id, page, {
      characters: 'characters' in fields,
    });
  }

  @Query(() => [Character])
  async character(
    @Args('filter', { nullable: true }) filter: CharacterFilterInput,
    @Args('page', { nullable: true }) page: PaginationInput,
    @Fields() fields: object,
  ) {
    return this.characterService.getCharacter(filter.id, page, {
      card: 'card' in fields,
      unit: 'unit' in fields,
    });
  }
  @Query(() => [Card])
  async card(
    @Args('filter', { nullable: true }) filter: CardFilterInput,
    @Args('page', { nullable: true }) page: PaginationInput,
    @Fields() fields: object,
  ) {
    return this.characterService.getCard(filter.id, page, {
      character: 'character' in fields,
      skill: 'skilll' in fields,
    });
  }
}
