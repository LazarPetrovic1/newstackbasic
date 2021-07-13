import { Module } from '@nestjs/common';
import { ControlService } from './control.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Control } from 'src/entities/Control';
import { ControlController } from './control.controller';
import { Item } from 'src/entities/Item';
import { User } from 'src/entities/User';
import { UsersModule } from 'src/users/users.module';
import { ItemsModule } from 'src/items/items.module';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Control, Item, User] }), UsersModule, ItemsModule],
  controllers: [ControlController],
  providers: [ControlService],
  exports: [ControlService]
})
export class ControlModule {}
