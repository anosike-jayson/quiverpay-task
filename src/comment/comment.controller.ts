import { Controller, Get } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from 'src/Entities/comment.entity';
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getAllComments(): Promise<Comment[]> {
    return this.commentService.getComments();
  }
}
