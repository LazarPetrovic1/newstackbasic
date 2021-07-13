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
      await user.items.init({ populate: [...user.items, newItem.id] })
    }
    if (!newItem.votes.isInitialized) {
      await newItem.votes.init({ populate: [...newItem.votes] })
    }
    await this.userRepository.persistAndFlush(user)
    await this.itemRepository.persistAndFlush(newItem)
    return newItem;
  }

  async findAll(): Promise<ItemEntity[]> {
    const users = await this.userRepository.findAll()
    console.log(users);
    return await this.itemRepository.findAll()
  }

  async update(id: number, item: Item): Promise<ItemEntity> {
    const newItem = this.itemRepository.create(item)
    await this.itemRepository.nativeUpdate({ id }, this.itemRepository.create(item))
    return newItem
  }

  async findOne(id: number): Promise<ItemEntity> {
    return await this.itemRepository.findOne({ id })
  }

  async remove(id: number): Promise<ItemEntity> {
    const item = await this.itemRepository.findOne({ id })
    await this.itemRepository.removeAndFlush(item)
    return item
  }
}
