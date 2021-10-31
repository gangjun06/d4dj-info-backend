import { PrismaService } from '@/prisma.service';
import { PaginationInput } from '@/types';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Event, Gacha } from './event';
import { EventFilterInput, GachaFilterInput } from './event.resolver';

@Injectable()
export class EventService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async getEvent(
    filter: EventFilterInput,
    page: PaginationInput,
    include: Prisma.EventInclude,
  ): Promise<Event[]> {
    const result = await this.prismaService.event.findMany({
      ...(page && {
        skip: page.skip,
        take: page.take,
        ...(page.after && { cursor: { id: page.after } }),
      }),
      ...(filter && {
        where: {
          ...(filter.id ? { id: filter.id } : {}),
        },
      }),
      include,
      orderBy: { startDate: 'desc' },
    });
    return result.map((item) => Event.gqlSchema(item));
  }

  async getGacha(
    filter: GachaFilterInput,
    page: PaginationInput,
    include: Prisma.GachaInclude,
  ): Promise<Gacha[]> {
    const result = await this.prismaService.gacha.findMany({
      ...(page && {
        skip: page.skip,
        take: page.take,
        ...(page.after && { cursor: { id: page.after } }),
      }),
      ...(filter && {
        where: {
          ...(filter.id ? { id: filter.id } : {}),
        },
      }),
      include: {
        pickUpCards: true,
      },
      orderBy: { startDate: 'desc' },
    });
    return result.map((item) => Gacha.gqlSchema(item));
  }
}
