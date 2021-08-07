import { Module } from '@nestjs/common';
import { CharacterResolver } from './character.resolver';
import { CharacterService } from './character.service';
import { PrismaService } from '@/prisma.service';

@Module({
  providers: [PrismaService, CharacterResolver, CharacterService],
})
export class CharacterModule {}
