import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/Entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { EpisodeService } from '../episode/episode.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private episodeService: EpisodeService,
  ) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { episodeId, ...rest } = createCommentDto;

    const episode = await this.episodeService.getEpisodeById(episodeId);
    if (!episode) {
      throw new NotFoundException('Episode not found');
    }

    const comment = this.commentRepository.create({
      ...rest,
      episode,
    });

    return await this.commentRepository.save(comment);
  }

  async getComments(): Promise<Comment[]> {
    return this.commentRepository.find({
      order: {
        created_at: 'DESC',
      },
      select: ['comment', 'ip_address_location', 'created_at'], 
    });
  }

  async getCommentById(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id }, relations: ['episode'] });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }
}
