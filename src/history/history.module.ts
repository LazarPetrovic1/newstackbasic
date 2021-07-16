import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { History } from 'src/entities/History';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [History] })],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService]
})
export class HistoryModule {}
