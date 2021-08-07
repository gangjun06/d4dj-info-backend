import { PrismaService } from '@/prisma.service';
import {
  Card as PrismaCard,
  Unit as PrismaUnit,
  Character as PrismaCharacter,
} from '@prisma/client';
import { PaginationInput } from '@/types';
import { Inject, Injectable } from '@nestjs/common';
import { Card, Character, Unit } from './character';

@Injectable()
export class CharacterService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async getUnit(): Promise<Unit[]> {
    const unit = await this.prismaService.unit.findMany({
      include: { Characters: true },
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
  ): Promise<Character[]> {
    const character = await this.prismaService.character.findMany({
      take,
      skip,
      where: id !== -1 ? { id } : {},
      include: { Card: true, Unit: true },
    });
    let result: Character[] = [];
    character.forEach((item) => {
      result.push(Character.gqlSchema(item, true));
    });
    return result;
  }
}
