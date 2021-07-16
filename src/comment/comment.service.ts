import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { History as HistoryEntity } from 'src/entities/History';
import { Comment as CommentEntity } from '../entities/Comment';
import { Item as ItemEntity } from "../entities/Item"
import { User as UserEntity } from "../entities/User"
import { Comment } from "./interfaces/comment.interface"

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: EntityRepository<CommentEntity>,
    @InjectRepository(ItemEntity)
    private readonly itemRepository: EntityRepository<ItemEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
    @InjectRepository(HistoryEntity)
    private readonly historyRepository: EntityRepository<HistoryEntity>
  ) {}

  async create(comment: Comment) : Promise<CommentEntity> {
    let newComment : CommentEntity;
    if (comment.id) newComment = await this.commentRepository.findOne({ id: comment.id })
    else newComment = this.commentRepository.create(comment)
    const newLog = this.historyRepository.create({
      log: `Created a comment on item ${newComment.item.id} (title: ${newComment.item.title}), by user ${newComment.user.name} (email: ${newComment.user.email})`,
      type: "comment",
      verb: "POST"
    })
    // KAD SE SREDI BAZA
    // const user = await this.userRepository.findOne({ id: comment.user.id })
    // const item = await this.itemRepository.findOne({ id: comment.item.id })
    // if (!user.comments.isInitialized) await user.comments.init({ populate: [...Array.from(user.comments).map(comm => comm.id.toString()), newComment.id.toString()] })
    // if (!item.comments.isInitialized) await item.comments.init({ populate: [...Array.from(item.comments).map(comm => comm.id.toString()), newComment.id.toString()] })
    await this.commentRepository.persistAndFlush(newComment)
    await this.historyRepository.persistAndFlush(newLog)
    // await this.itemRepository.persistAndFlush(item)
    // await this.userRepository.persistAndFlush(user)
    return newComment
  }

  async getAllItemComments(id: number) : Promise<CommentEntity[]> {
    const item = await this.itemRepository.findOne({ id })
    const comments = await this.commentRepository.findAll(item)
    return comments
  }

  async getAllUserComments(id: number) : Promise<CommentEntity[]> {
    const user = await this.userRepository.findOne({ id })
    const comments = await this.commentRepository.findAll(user)
    return comments;
  }

  async findOne(id: number) : Promise<CommentEntity> {
    const comment = await this.commentRepository.findOne({ id })
    return comment
  }

  async update(id: number, comment: Comment) : Promise<CommentEntity> {
    const newComment = this.commentRepository.create(comment)
    const newLog = this.historyRepository.create({
      log: `Updated the comment on item ${newComment.item.id} (title: ${newComment.item.title}), by user ${newComment.user.name} (email: ${newComment.user.email})`,
      type: "comment",
      verb: "PUT"
    })
    await this.historyRepository.persistAndFlush(newLog)
    await this.commentRepository.nativeUpdate({ id }, newComment)
    return newComment
  }

  async remove(id: number) : Promise<CommentEntity> {
    const comment = await this.commentRepository.findOne({ id })
    const newLog = this.historyRepository.create({
      log: `Updated the comment on item ${comment.item.id} (title: ${comment.item.title}), by user ${comment.user.name} (email: ${comment.user.email})`,
      type: "comment",
      verb: "DELETE"
    })
    await this.historyRepository.persistAndFlush(newLog)
    await this.commentRepository.nativeDelete({ id })
    return comment
  }
}
