import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { History } from 'src/entities/History';
import { Item } from 'src/entities/Item';
import { User } from 'src/entities/User';
import { HistoryModule } from 'src/history/history.module';
import { UsersModule } from 'src/users/users.module';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Item, User, History] }), UsersModule, HistoryModule],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService]
})
export class ItemsModule {}
