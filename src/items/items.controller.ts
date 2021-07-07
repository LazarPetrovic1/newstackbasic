import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Item } from 'src/entities/Item';
import { ItemsService } from './items.service';
import { CreateItemDTO } from "./dto/create-item.dto"

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll()
  }

  @Get(":id")
  async findOne(@Param('id') id): Promise<Item> {
    return await this.itemsService.findOne(id)
  }

  @Post()
  async create(@Body() createItemDto: CreateItemDTO): Promise<Item> {
    return await this.itemsService.create(createItemDto)
  }

  @Delete(':id')
  remove(@Param("id") id): Promise<Item> {
    return this.itemsService.remove(id)
  }

  @Put(":id")
  update(@Body() updateItemDto: CreateItemDTO, @Param("id") id): Promise<Item> {
    return this.itemsService.update(id, updateItemDto)
  }
}
