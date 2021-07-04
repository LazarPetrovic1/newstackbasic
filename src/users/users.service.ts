import { EntityRepository } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { User as UserEntity } from "../entities/User"
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>
  ) {}

  async create(user: User): Promise<UserEntity> {
    const newUser = this.userRepository.create(user)
    await this.userRepository.persistAndFlush(newUser)
    return newUser;
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }

  async update(id: string, user: User): Promise<UserEntity> {
    const newUser = this.userRepository.create(user)
    await this.userRepository.nativeUpdate({ id }, this.userRepository.create(user))
    return newUser;
  }

  async findOne(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ id })
  }

  async remove(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ id })
    await this.userRepository.removeAndFlush(user)
    return user;
  }
}
