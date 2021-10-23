import { PrismaService } from '@/prisma.service';
import { PaginationInput } from '@/types';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Card, Character, Unit } from './character';
import { CardFilterInput, CardSort, CardSortInput } from './character.resolver';

@Injectable()
export class CharacterService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async getUnit(
    { take, skip }: PaginationInput,
    include: Prisma.UnitInclude,
  ): Promise<Unit[]> {
    const unit = await this.prismaService.unit.findMany({
      take,
      skip,
      include: include,
    });
    let result: Unit[] = [];
    unit.forEach((item) => {
      result.push(Unit.gqlSchema(item));
    });
    return result;
  }
  async getCharacter(
    { take, skip }: PaginationInput,
    include: Prisma.CharacterInclude,
  ): Promise<Character[]> {
    const character = await this.prismaService.character.findMany({
      take,
      skip,
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
    { take, skip }: PaginationInput,
    include: Prisma.CardInclude,
  ): Promise<Card[]> {
    const card = await this.prismaService.card.findMany({
      take,
      skip,
      where: {
        attribute: filter.attribute,
        AND: [
          filter.rairity && {
            OR: [...filter.rairity.map((item) => ({ rarity: item }))],
          },
          filter.unit && {
            OR: [
              ...filter.unit.map((item) => ({
                character: {
                  unitPrimaryKey: item,
                },
              })),
            ],
          },
          {},
        ],
      },
      ...(orderBy && {
        orderBy: { [orderBy.name]: orderBy.order },
      }),

      include,
    });
    let result: Card[] = [];
    card.forEach((item) => {
      result.push(Card.gqlSchema(item));
    });
    return result;
  }
}
