import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { User as UserEntity } from "../entities/User"

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll()
  }

  @Get(":id")
  async findOne(@Param('id') id): Promise<User> {
    return await this.usersService.findOne(id)
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDTO): Promise<User> {
    return await this.usersService.create(createUserDto)
  }

  @Delete(":id")
  remove(@Param("id") id): Promise<User> {
    return this.usersService.remove(id)
  }

  @Put(":id")
  update(@Body() updateUserDto: CreateUserDTO, @Param("id") id): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }
}
