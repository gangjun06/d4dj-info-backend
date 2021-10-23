import { PrismaService } from '@/prisma.service';
import { Module } from '@nestjs/common';
import { MusicResolver } from './music.resolver';
import { MusicService } from './music.service';

@Module({
  providers: [PrismaService, MusicResolver, MusicService],
})
export class MusicModule {}
