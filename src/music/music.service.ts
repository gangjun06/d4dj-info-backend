import { PrismaService } from '@/prisma.service';
import { PaginationInput } from '@/types';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Music } from './music';
import { MusicFilterInput, MusicSortInput } from './music.resolver';
import _ from 'lodash';

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
}
