import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { History as HistoryEntity } from 'src/entities/History';
import { History } from './interfaces/history.interface';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryEntity)
    private readonly historyRepository: EntityRepository<HistoryEntity>
  ) {}

  async create(history: History) : Promise<HistoryEntity> {
    let newLog : HistoryEntity;
    newLog = await this.historyRepository.findOne({ id: history.id })
    if (!newLog) newLog = this.historyRepository.create(history)
    await this.historyRepository.persistAndFlush(newLog)
    return newLog
  }

  async findAll() : Promise<HistoryEntity[]> {
    const allLogs = await this.historyRepository.findAll()
    return allLogs
  }

  async findOne(id: number) : Promise<HistoryEntity> {
    return await this.historyRepository.findOne({ id })
  }

  async remove(id: number) : Promise<HistoryEntity> {
    const log = await this.historyRepository.findOne({ id })
    await this.historyRepository.removeAndFlush(log)
    return log
  }
}
