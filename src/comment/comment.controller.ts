import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from 'src/Entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.createComment(createCommentDto);
  }

  @Get()
  async getAllComments(): Promise<Comment[]> {
    return this.commentService.getComments();
  }
}
