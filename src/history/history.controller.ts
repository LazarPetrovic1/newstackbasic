import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { History as HistoryEntity } from 'src/entities/History';
import { CreateHistoryDTO } from './dto/create-history.dto';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}
  
  @Post()
  async create(@Body() createHistoryDto : CreateHistoryDTO) : Promise<HistoryEntity> {
    return await this.historyService.create(createHistoryDto)
  }
 
  @Get()
  async findAll() : Promise<HistoryEntity[]> {
    return this.historyService.findAll()
  }

  @Get(":id")
  async findOne(@Param("id") id : number) : Promise<HistoryEntity> {
    return this.historyService.findOne(id)
  }

  @Delete(":id")
  async remove(@Param("id") id : number) : Promise<HistoryEntity> {
    return await this.historyService.remove(id)
  }
}
