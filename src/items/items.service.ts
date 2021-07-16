import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Item as ItemEntity } from 'src/entities/Item';
import { Item } from './interfaces/item.interface';
import { User as UserEntity } from 'src/entities/User';
import { History as HistoryEntity } from 'src/entities/History';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly itemRepository: EntityRepository<ItemEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
    @InjectRepository(HistoryEntity)
    private readonly historyRepository: EntityRepository<HistoryEntity>
  ) {}

  async create(item: Item): Promise<ItemEntity> {
    let newItem : any;
    newItem = await this.itemRepository.findOne({ id: item.id })
    const newLog = this.historyRepository.create({
      log: `Item (title: ${item.title}) has been successfully created.`,
      type: "item",
      verb: "POST"
    })
    if (!newItem) newItem = this.itemRepository.create(item);
    const user = await this.userRepository.findOne({ id: newItem.author });
    if (!user.items.isInitialized) {
      await user.items.init({ populate: [...Array.from(user.items).map(item => item.id), newItem.id] })
    }
    if (!newItem.votes.isInitialized) {
      await newItem.votes.init({ populate: [...Array.from(newItem.votes).map(vote => vote)] })
    }
    await this.historyRepository.persistAndFlush(newLog)
    await this.userRepository.persistAndFlush(user)
    await this.itemRepository.persistAndFlush(newItem)
    return newItem;
  }

  async findAll(): Promise<ItemEntity[]> {
    const items = await this.itemRepository.findAll()
    for await (const item of items) {
      await item.votes.init()
      for (let i = 0; i < item.votes.length; i++) {
        item.votes.hydrate(Array.from(item.votes))
      }
      item.votes.populated()
    }
    return items
  }

  async update(id: number, item: Item): Promise<ItemEntity> {
    const newItem = this.itemRepository.create(item)
    const newLog = this.historyRepository.create({
      log: `Item (title: ${item.title}) has been successfully updated.`,
      type: "item",
      verb: "PUT"
    })
    await this.historyRepository.persistAndFlush(newLog)
    await this.itemRepository.nativeUpdate({ id }, this.itemRepository.create(item))
    return newItem
  }

  async findOne(id: number): Promise<ItemEntity> {
    const item = await this.itemRepository.findOne({ id })
    await item.votes.init()
    for (let i = 0;i < item.votes.length; i++) {
      item.votes.hydrate(Array.from(item.votes))
    }
    item.votes.populated();
    console.log("AJTEM", item);
    return item
  }

  async remove(id: number): Promise<ItemEntity> {
    const item = await this.itemRepository.findOne({ id })
    const newLog = this.historyRepository.create({
      log: `Item (title: ${item.title}) has been successfully removed.`,
      type: "item",
      verb: "DELETE"
    })
    await this.historyRepository.persistAndFlush(newLog)
    await this.itemRepository.removeAndFlush(item)
    return item
  }
}
