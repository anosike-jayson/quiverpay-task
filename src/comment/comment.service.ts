import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/Entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  // Get comments in reverse chronological order
  async getComments(): Promise<Comment[]> {
    return await this.commentRepository
      .createQueryBuilder('comment')
      .orderBy('comment.created_at', 'DESC')
      .select(['comment.comment', 'comment.ip_address_location', 'comment.created_at'])
      .getMany();
  }
}
