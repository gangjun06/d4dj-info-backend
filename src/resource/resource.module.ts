import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceResolver } from './resource.resolver';
import { PrismaService } from '@/prisma.service';

@Module({
  providers: [ResourceService, ResourceResolver, PrismaService],
})
export class ResourceModule {}
