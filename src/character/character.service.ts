import { PrismaService } from '@/prisma.service';
import {
  Card as PrismaCard,
  Unit as PrismaUnit,
  Character as PrismaCharacter,
  Prisma,
} from '@prisma/client';
import { PaginationInput } from '@/types';
import { Inject, Injectable } from '@nestjs/common';
import { Card, Character, Unit } from './character';

@Injectable()
export class CharacterService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async getUnit(
    id: number,
    { take, skip }: PaginationInput,
    include: Prisma.UnitInclude,
  ): Promise<Unit[]> {
    const unit = await this.prismaService.unit.findMany({
      take,
      skip,
      where: id !== -1 ? { id } : {},
      include: include,
    });
    let result: Unit[] = [];
    unit.forEach((item) => {
      result.push(Unit.gqlSchema(item, true));
    });
    return result;
  }
  async getCharacter(
    id: number,
    { take, skip }: PaginationInput,
    include: Prisma.CharacterInclude,
  ): Promise<Character[]> {
    const character = await this.prismaService.character.findMany({
      take,
      skip,
      where: id !== -1 ? { id } : {},
      include,
    });
    let result: Character[] = [];
    character.forEach((item) => {
      result.push(Character.gqlSchema(item, true));
    });
    return result;
  }
  async getCard(
    id: number,
    { take, skip }: PaginationInput,
    include: Prisma.CardInclude,
  ): Promise<Card[]> {
    const character = await this.prismaService.card.findMany({
      take,
      skip,
      where: id !== -1 ? { id } : {},
      include,
    });
    let result: Card[] = [];
    character.forEach((item) => {
      result.push(Card.gqlSchema(item, true));
    });
    return result;
  }
}
