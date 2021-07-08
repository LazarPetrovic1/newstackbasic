import { EntityRepository } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { User as UserEntity } from "../entities/User"
import { InjectRepository } from '@mikro-orm/nestjs';
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>
  ) {}

  async create(user: User): Promise<UserEntity> {
    const newUser = this.userRepository.create(user)
    const salt: string = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await this.userRepository.persistAndFlush(newUser)
    return newUser;
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }

  async update(id: number, user: User): Promise<UserEntity> {
    const newUser = this.userRepository.create(user)
    const salt: string = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await this.userRepository.nativeUpdate({ id }, this.userRepository.create(user))
    return newUser;
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ id })
  }

  async remove(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ id })
    await this.userRepository.removeAndFlush(user)
    return user;
  }

  async login(email: string, password: string): Promise<Object> {
    const user = await this.userRepository.findOne({ email })
    if (!user) {
      return `There is no registered user with the email ${email}.`
    }
    const isMatch: boolean = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return `Password doesn't match for user with email ${email}.`
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token: Promise<string> = await jwt.sign(payload, "somesecretsalthashingstringofconcatenatedtext", { expiresIn: 360000000 })

    return {
      token,
      user
    };
  }
}
