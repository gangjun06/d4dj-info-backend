import { PrismaService } from '@/prisma.service';
import { Module } from '@nestjs/common';
import { EventResolver } from './event.resolver';
import { EventService } from './event.service';

@Module({
  providers: [PrismaService, EventResolver, EventService],
})
export class EventModule {}
