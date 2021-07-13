import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Control as ControlEntity } from 'src/entities/Control';
import { ControlService } from './control.service';
import { Control } from './interfaces/control.interface';

@Controller('control')
export class ControlController {
  constructor(private controlService: ControlService) {}

  @Get("/item/:id")
  async getAllItemVotes(@Param("id") id: number) : Promise<ControlEntity[]> {
    return await this.controlService.getAllItemVotes(id);
  }

  @Post()
  async create(@Body() control: Control) : Promise<ControlEntity> {
    return await this.controlService.create(control)
  }

  @Get("/user/:id")
  async getAllUserVotes(@Param("id") id: number) : Promise<ControlEntity[]> {
    return await this.controlService.getAllUserVotes(id);
  }
  
  @Get(":id")
  async findOne(@Param("id") id: number) : Promise<ControlEntity> {
    return await this.controlService.findOne(id);
  }

  @Put(":id")
  async update(@Param("id") id: number, control: Control) : Promise<ControlEntity> {
    return await this.controlService.update(id, control)
  }

  @Delete(":id")
  async remove(@Param(":id") id: number) : Promise<ControlEntity> {
    return await this.controlService.remove(id)
  }
}
