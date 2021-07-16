import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { History } from 'src/entities/History';
import { Message } from 'src/entities/Message';
import { User } from 'src/entities/User';
import { HistoryModule } from 'src/history/history.module';
import { UsersModule } from 'src/users/users.module';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Message, User, History] }), UsersModule, HistoryModule],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService]
})
export class MessagesModule {}
