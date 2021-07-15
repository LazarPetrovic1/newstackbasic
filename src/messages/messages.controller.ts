import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Message } from 'src/entities/Message';
import { CreateMessageDTO } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get("/from/:id")
  async findAllOfUser(@Param("id") id: number) : Promise<Message[]> {
    return await this.messagesService.findAllOfUser(id)
  }

  @Get("/to/:id")
  async findAllToUser(@Param("id") id: number) : Promise<Message[]> {
    return await this.messagesService.findAllToUser(id)
  }

  @Get(":id")
  async findOne(@Param("id") id: number) : Promise<Message> {
    return await this.messagesService.findOne(id)
  }

  @Post()
  async create(@Body() createMessageDto: CreateMessageDTO) : Promise<Message> {
    return await this.messagesService.create(createMessageDto)
  }

  @Delete(":id")
  remove(@Param("id") id: number) : Promise<Message> {
    return this.messagesService.remove(id)
  }

  @Put(":id")
  async update(@Body() updateMessageDto: CreateMessageDTO, @Param("id") id: number) : Promise<Message> {
    return await this.messagesService.update(id, updateMessageDto)
  }
}
