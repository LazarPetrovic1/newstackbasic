import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Comment } from 'src/entities/Comment';
import { History } from 'src/entities/History';
import { Item } from 'src/entities/Item';
import { User } from 'src/entities/User';
import { HistoryModule } from 'src/history/history.module';
import { ItemsModule } from 'src/items/items.module';
import { UsersModule } from 'src/users/users.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Comment, Item, User, History] }), UsersModule, ItemsModule, HistoryModule],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService]
})
export class CommentModule {}
