import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Comment as CommentEntity } from 'src/entities/Comment';
import { CommentService } from './comment.service';
import { Comment } from './interfaces/comment.interface';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get("/item/:id")
  async getAllItemComments(@Param("id") id: number) : Promise<CommentEntity[]> {
    return await this.commentService.getAllItemComments(id)
  }

  @Post()
  async create(@Body() comment: Comment) : Promise<CommentEntity> {
    return await this.commentService.create(comment)
  }

  @Get("/user/:id")
  async getAllUserComments(@Param("id") id: number) : Promise<CommentEntity[]> {
    return await this.commentService.getAllUserComments(id)
  }

  @Get(":id")
  async findOne(@Param("id") id: number) : Promise<CommentEntity> {
    return await this.commentService.findOne(id)
  }

  @Put(":id")
  async update(@Param("id") id: number, @Body() comment: Comment) : Promise<CommentEntity> {
    return await this.commentService.update(id, comment)
  }

  @Delete(":id")
  async remove(@Param("id") id: number) : Promise<CommentEntity> {
    return await this.commentService.remove(id)
  }
}
