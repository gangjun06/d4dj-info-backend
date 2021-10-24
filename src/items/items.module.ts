import { Module } from '@nestjs/common';
import { ItemsResolver } from './items.resolver';
import { ItemsService } from './items.service';

@Module({
  providers: [ItemsResolver, ItemsService]
})
export class ItemsModule {}
