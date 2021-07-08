import { EntityRepository } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Item as ItemEntity } from 'src/entities/Item';
import { Item } from './interfaces/item.interface';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly itemRepository: EntityRepository<ItemEntity>
  ) {}

  async create(item: Item): Promise<ItemEntity> {
    const newItem = this.itemRepository.create(item)
    await this.itemRepository.persistAndFlush(newItem)
    return newItem;
  }

  async findAll(): Promise<ItemEntity[]> {
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
