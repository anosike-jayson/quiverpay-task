import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/Entities/comment.entity';
import { async } from 'rxjs';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Episode } from 'src/Entities/episode.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Episode)
    private readonly episodeRepository: Repository<Episode>,
  ) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { episodeId, ...commentData } = createCommentDto;
    const episode = await this.episodeRepository.findOne({ where: { id: episodeId } });
    
    if (!episode) {
      throw new Error('Episode not found');
    }

    const comment = this.commentRepository.create({
      ...commentData,
      episode,
    });

    return await this.commentRepository.save(comment);
  }

  async getComments(): Promise<Comment[]> {
    try {
      return await this.commentRepository
        .createQueryBuilder('comment')
        .orderBy('comment.created_at', 'DESC')
        .getMany();
    } catch (error) {
      throw new Error('Failed to fetch comments');
    }
  }
  
}
