import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Message as MessageEntity } from 'src/entities/Message';
import { User as UserEntity } from 'src/entities/User';
import { Message } from './interfaces/message.interface';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: EntityRepository<MessageEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>
  ) {}

  async create(message: Message) : Promise<MessageEntity> {
    let newMessage: MessageEntity;
    newMessage = await this.messageRepository.findOne({ id: message.id })
    if (!newMessage) newMessage = this.messageRepository.create(message)
    const user = await this.userRepository.findOne({ id: message.toUser.id })
    if (!user.messages.isInitialized)
    await user.messages.init()
    return newMessage;
  }

  async findAllOfUser(id: number) : Promise<MessageEntity[]> {
    const messages = await this.messageRepository.find({ fromUser: id })
    return messages;
  }

  async findAllToUser(id: number) : Promise<MessageEntity[]> {
    const messages = await this.messageRepository.find({ toUser: id })
    return messages;
  }

  async findOne(id: number) : Promise<MessageEntity> {
    return await this.messageRepository.findOne({ id })
  }

  async update(id: number, message: Message) : Promise<MessageEntity> {
    const newMessage = this.messageRepository.create(message)
    await this.messageRepository.nativeUpdate({ id }, newMessage)
    return newMessage
  }

  async remove(id: number) : Promise<MessageEntity> {
    const message = await this.messageRepository.findOne({ id })
    await this.messageRepository.removeAndFlush(message)
    return message;
  }
}
