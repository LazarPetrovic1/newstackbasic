import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Item } from 'src/entities/Item';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [MikroOrmModule.forFeature([Item])],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService]
})
export class ItemsModule {}
