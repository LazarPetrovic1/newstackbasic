import { Options } from '@mikro-orm/core';
import { MikroOrmModule, MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/User';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { ItemsController } from './items/items.controller';
import { ItemsModule } from './items/items.module';
import { Item } from './entities/Item';
import { ControlController } from './control/control.controller';
import { ControlModule } from './control/control.module';
import { Control } from './entities/Control';
import { CommentController } from './comment/comment.controller';
import { CommentModule } from './comment/comment.module';
import { Comment } from './entities/Comment';
import { MessagesController } from './messages/messages.controller';
import { MessagesModule } from './messages/messages.module';
import { Message } from './entities/Message';
import { HistoryController } from './history/history.controller';
import { HistoryModule } from './history/history.module';
import { History } from './entities/History';

const defaultOptions : Options = {
  type: 'postgresql',
  port: 5432,
  password: '15577800',
  dbName: "backend",
  clientUrl: "postgres://postgres:15577800@localhost:5432/backend",
}

@Module({
  imports: [
    MikroOrmModule.forRoot({
      ...defaultOptions,
      host: 'localhost',
      entities: [User, Item, Control, Comment, Message, History]
    } as Options),
    UsersModule,
    ItemsModule,
    ControlModule,
    CommentModule,
    MessagesModule,
    HistoryModule
  ],
  controllers: [AppController, UsersController, ItemsController, ControlController, CommentController, MessagesController, HistoryController],
  providers: [AppService],
})
export class AppModule {}
