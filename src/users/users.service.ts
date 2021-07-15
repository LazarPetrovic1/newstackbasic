import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { User as UserEntity } from "../entities/User"
// import { UsersRepository } from './users.repository';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    // private readonly userRepository: UsersRepository
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
    const users = await this.userRepository.findAll()
    for await (const newUser of users) {
      await newUser.items.init()
      await newUser.votes.init()
      await newUser.messages.init()
      for (let i = 0; i < newUser.items.length; i++) {
        newUser.items.hydrate(Array.from(newUser.items))
      }
      for (let i = 0; i < newUser.votes.length; i++) {
        newUser.votes.hydrate(Array.from(newUser.votes))
      }
      for (let i = 0; i < newUser.messages.length; i++) {
        newUser.messages.hydrate(Array.from(newUser.messages))
      }
      newUser.items.populated();
    }
    return users;
  }

  async update(id: number, user: User): Promise<UserEntity> {
    const newUser = this.userRepository.create(user)
    const salt: string = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await this.userRepository.nativeUpdate({ id }, newUser)
    return newUser;
  }

  async findOne(id: number): Promise<UserEntity> {
    const newUser = await this.userRepository.findOne({ id })
    await newUser.items.init()
    await newUser.votes.init()
    for (let i = 0;i < newUser.items.length; i++) {
      newUser.items.hydrate(Array.from(newUser.items))
    }
    for (let i = 0;i < newUser.votes.length; i++) {
      newUser.votes.hydrate(Array.from(newUser.votes))
    }
    newUser.items.populated();
    return newUser
  }

  async remove(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ id })
    await this.userRepository.removeAndFlush(user)
    return user;
  }

  async login(email: string, password: string): Promise<Object> {
    const user = await this.userRepository.findOne({ email })
    console.log("JUZER", user);
    if (!user) return `There is no registered user with the email ${email}.`
    const isMatch: boolean = await bcrypt.compare(password, user.password)
    if (!isMatch) return `Password doesn't match for user with email ${email}.`
    const payload = { user: { id: user.id } };
    const token: Promise<string> = await jwt.sign(payload, "somesecretsalthashingstringofconcatenatedtext", { expiresIn: 360000000 })
    return { token, user };
  }
}
