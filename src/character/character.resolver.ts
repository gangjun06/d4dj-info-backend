import { PaginationInput } from '@/types';
import { Inject } from '@nestjs/common';
import {
  ResolveField,
  Resolver,
  Query,
  Args,
  InputType,
  Field,
} from '@nestjs/graphql';
import { Character, Unit } from './character';
import { CharacterService } from './character.service';

@InputType()
export class CharacterFilterInput {
  @Field({ defaultValue: -1 })
  id?: number;
}

@Resolver('character')
export class CharacterResolver {
  constructor(
    @Inject(CharacterService) private characterService: CharacterService,
  ) {}
  @Query(() => [Unit])
  async unit() {
    return this.characterService.getUnit();
  }
  @Query(() => [Character])
  async character(
    @Args('filter', { nullable: true }) filter: CharacterFilterInput,
    @Args('page', { nullable: true }) page: PaginationInput,
  ) {
    return this.characterService.getCharacter(filter.id, page);
  }
}
