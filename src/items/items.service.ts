import { QueryOrder } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Item as ItemEntity } from 'src/entities/Item';
import { Item } from './interfaces/item.interface';
import { User as UserEntity } from 'src/entities/User';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly itemRepository: EntityRepository<ItemEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
  ) {}

  async create(item: Item): Promise<ItemEntity> {
    let newItem : any;
    newItem = await this.itemRepository.findOne({ id: item.id })
    if (!newItem) newItem = this.itemRepository.create(item);
    const user = await this.userRepository.findOne({ id: newItem.author });
    if (!user.items.isInitialized) {
      await user.items.init({ populate: [...Array.from(user.items).map(item => item.id), newItem.id] })
    }
    if (!newItem.votes.isInitialized) {
      await newItem.votes.init({ populate: [...Array.from(newItem.votes).map(vote => vote)] })
    }
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
    await this.itemRepository.removeAndFlush(item)
    return item
  }
}
