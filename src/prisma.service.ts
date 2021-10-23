import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import lodash from 'lodash';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
    });
  }

  static getOrderValue<T extends object>(
    name: string | undefined,
    order: Prisma.SortOrder | undefined,
  ): T {
    if (!name || name.trim() === '') return undefined;
    //@ts-ignore
    let newObject: object = {
      orderBy: name.split('.').reduceRight(
        //@ts-ignore
        (obj, next) => ({
          [next]: obj,
        }),
        order,
      ),
    };

    return newObject as T;
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
