import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Item } from 'src/entities/Item';
import { User } from 'src/entities/User';
import { UsersModule } from 'src/users/users.module';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Item, User] }), UsersModule],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService]
})
export class ItemsModule {}
