import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
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
  ) {}

  async create(comment: Comment) : Promise<CommentEntity> {
    let newComment : CommentEntity;
    if (comment.id) newComment = await this.commentRepository.findOne({ id: comment.id })
    else newComment = this.commentRepository.create(comment)
    // KAD SE SREDI BAZA
    // const user = await this.userRepository.findOne({ id: comment.user.id })
    // const item = await this.itemRepository.findOne({ id: comment.item.id })
    // if (!user.comments.isInitialized) await user.comments.init({ populate: [...Array.from(user.comments).map(comm => comm.id.toString()), newComment.id.toString()] })
    // if (!item.comments.isInitialized) await item.comments.init({ populate: [...Array.from(item.comments).map(comm => comm.id.toString()), newComment.id.toString()] })
    await this.commentRepository.persistAndFlush(newComment)
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
    await this.commentRepository.nativeUpdate({ id }, newComment)
    return newComment
  }

  async remove(id: number) : Promise<CommentEntity> {
    const comment = await this.commentRepository.findOne({ id })
    await this.commentRepository.nativeDelete({ id })
    return comment
  }
}
