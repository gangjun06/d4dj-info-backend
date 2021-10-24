import { PrismaService } from '@/prisma.service';
import { PaginationInput } from '@/types';
import { Inject, Injectable } from '@nestjs/common';
import { MusicSection, Prisma } from '@prisma/client';
import { ChartNoteCount, Music } from './music';
import { MusicFilterInput, MusicSortInput } from './music.resolver';

@Injectable()
export class MusicService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async getMusic(
    filter: MusicFilterInput,
    orderBy: MusicSortInput,
    page: PaginationInput | undefined,
    include: Prisma.MusicInclude,
  ): Promise<Music[]> {
    return (
      await this.prismaService.music.findMany({
        ...(page && page),
        where: {},
        ...(orderBy &&
          PrismaService.getOrderValue<Prisma.MusicFindManyArgs>(
            orderBy.name,
            orderBy.order,
          )),

        include,
      })
    ).map((item) => Music.gqlSchema(item));
  }

  async getChartNoteCount(chartId: number, section: MusicSection) {
    return ChartNoteCount.gqlSchema(
      await this.prismaService.chartNoteCount.findFirst({
        where: {
          AND: {
            chartId,
            section,
          },
        },
      }),
    );
  }
}
