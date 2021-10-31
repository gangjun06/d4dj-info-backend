import { PrismaService } from '@/prisma.service';
import { PaginationInput } from '@/types';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Card, Character, Unit } from './character';
import {
  CardFilterInput,
  CardSortInput,
  CharacterFilterInput,
} from './character.resolver';

@Injectable()
export class CharacterService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async getUnit(
    page: PaginationInput,
    include: Prisma.UnitInclude,
  ): Promise<Unit[]> {
    const unit = await this.prismaService.unit.findMany({
      ...(page && {
        skip: page.skip,
        take: page.take,
        ...(page.after && { cursor: { id: page.after } }),
      }),
      include: include,
    });
    let result: Unit[] = [];
    unit.forEach((item) => {
      result.push(Unit.gqlSchema(item));
    });
    return result;
  }
  async getCharacter(
    filter: CharacterFilterInput,
    page: PaginationInput,
    include: Prisma.CharacterInclude,
  ): Promise<Character[]> {
    const character = await this.prismaService.character.findMany({
      ...(page && {
        skip: page.skip,
        take: page.take,
        ...(page.after && { cursor: { id: page.after } }),
      }),
      where: {
        ...(filter.id
          ? { id: filter.id }
          : { AND: [filter.unit && { unitPrimaryKey: { in: filter.unit } }] }),
      },
      include,
    });
    let result: Character[] = [];
    character.forEach((item) => {
      result.push(Character.gqlSchema(item));
    });
    return result;
  }
  async getCard(
    filter: CardFilterInput,
    orderBy: CardSortInput,
    page: PaginationInput,
    include: Prisma.CardInclude,
  ): Promise<Card[]> {
    const card = await this.prismaService.card.findMany({
      ...(page && {
        skip: page.skip,
        take: page.take,
        ...(page.after && { cursor: { id: page.after } }),
      }),
      ...(filter && {
        where: {
          ...(filter.id
            ? { id: filter.id }
            : {
                AND: [
                  { attribute: filter.attribute },
                  filter.rairity && { rarity: { in: filter.rairity } },
                  filter.unit && {
                    character: { unitPrimaryKey: { in: filter.unit } },
                  },
                ],
              }),
        },
      }),
      ...(orderBy &&
        PrismaService.getOrderValue<Prisma.CardFindManyArgs>(
          orderBy.name,
          orderBy.order,
        )),
      include,
    });

    return card.map((item) => Card.gqlSchema(item));
  }
}
