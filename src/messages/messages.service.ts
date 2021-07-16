import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { History as HistoryEntity } from 'src/entities/History';
import { Message as MessageEntity } from 'src/entities/Message';
import { User as UserEntity } from 'src/entities/User';
import { Message } from './interfaces/message.interface';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: EntityRepository<MessageEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
    @InjectRepository(HistoryEntity)
    private readonly historyRepository: EntityRepository<HistoryEntity>
  ) {}

  async create(message: Message) : Promise<MessageEntity> {
    let newMessage: MessageEntity;
    newMessage = await this.messageRepository.findOne({ id: message.id })
    if (!newMessage) newMessage = this.messageRepository.create(message)
    const user = await this.userRepository.findOne({ id: newMessage.toUser.id })
    const newLog = this.historyRepository.create({
      log: `Message has been sent to user #${message.toUser} by user #${message.fromUser}.`,
      type: "message",
      verb: "POST"
    })
    if (!user.messages.isInitialized)
    await user.messages.init()
    user.messages.add(newMessage)
    await this.historyRepository.persistAndFlush(newLog)
    await this.userRepository.persistAndFlush(user)
    await this.messageRepository.persistAndFlush(newMessage)
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
    const newLog = this.historyRepository.create({
      log: `The message has been successfully updated - #${id}.`,
      type: "message",
      verb: "PUT"
    })
    const newMessage = this.messageRepository.create(message)
    await this.historyRepository.persistAndFlush(newLog)
    await this.messageRepository.nativeUpdate({ id }, newMessage)
    return newMessage
  }

  async updateStatus(id: number, message: Message) : Promise<MessageEntity> {
    let newMessage : MessageEntity;
    newMessage = await this.messageRepository.findOne({ id })
    const newLog = this.historyRepository.create({
      log: `The status of message #${id} has been successfully changed.`,
      type: "message",
      verb: "PUT"
    })
    newMessage.status = message.status
    if (!newMessage) newMessage = this.messageRepository.create(message)
    await this.historyRepository.persistAndFlush(newLog)
    await this.messageRepository.nativeUpdate({ id }, newMessage)
    return newMessage;
  }

  async remove(id: number) : Promise<MessageEntity> {
    const newLog = this.historyRepository.create({
      log: `Message has been successfully deleted.`,
      type: "message",
      verb: "DELETE"
    })
    const message = await this.messageRepository.findOne({ id })
    await this.historyRepository.persistAndFlush(newLog)
    await this.messageRepository.removeAndFlush(message)
    return message;
  }
}
