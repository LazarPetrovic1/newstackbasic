import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { User as UserEntity } from "../entities/User"

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll()
  }

  @Get(":id")
  async findOne(@Param('id') id: number): Promise<UserEntity> {
    return await this.usersService.findOne(id)
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDTO): Promise<UserEntity> {
    return await this.usersService.create(createUserDto)
  }

  @Post("login")
  async login(@Body() user: any): Promise<Object> {
    const { email, password } = user
    return await this.usersService.login(email, password);
  }

  @Delete(":id")
  remove(@Param("id") id: number): Promise<UserEntity> {
    return this.usersService.remove(id)
  }

  @Put(":id")
  update(@Body() updateUserDto: CreateUserDTO, @Param("id") id: number): Promise<UserEntity> {
    return this.usersService.update(id, updateUserDto);
  }
}
