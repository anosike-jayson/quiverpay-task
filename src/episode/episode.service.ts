import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episode } from 'src/Entities/episode.entity';
import { CreateCommentDto } from '../comment/dto/create-comment.dto';
import { Comment } from 'src/Entities/comment.entity';
import { CreateEpisodeDto } from './dto/create-episode.dto';

@Injectable()
export class EpisodeService {
  constructor(
    @InjectRepository(Episode)
    private episodeRepository: Repository<Episode>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async createEpisode(createEpisodeDto: CreateEpisodeDto): Promise<Episode> {
    const episode = this.episodeRepository.create(createEpisodeDto);
    return await this.episodeRepository.save(episode);
  }
  
  async getEpisodes(): Promise<any[]> {
    const result = await this.episodeRepository
      .createQueryBuilder('episode')
      .leftJoinAndSelect('episode.episode_comments', 'comment')
      .orderBy('episode.release_date', 'ASC')
      .select([
        'episode.id',
        'episode.name',
        'episode.release_date',
        'episode.episode_code',
        'COUNT(comment.id) as commentCount',
      ])
      .groupBy('episode.id')
      .getRawMany();

    return result.map(raw => ({
      id: raw.episode_id,
      name: raw.episode_name,
      releaseDate: raw.episode_release_date,
      episodeCode: raw.episode_episode_code,
      commentCount: parseInt(raw.commentCount, 10),
    }));
  }

  async addComment(episodeId: number, createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepository.create({
      ...createCommentDto,
      episode: { id: episodeId },
    });

    return this.commentRepository.save(comment);
  }

  async getEpisodesForCharacter(characterId: number): Promise<Episode[]> {
    return this.episodeRepository
      .createQueryBuilder('episode')
      .leftJoin('episode.characters', 'character')
      .where('character.id = :characterId', { characterId })
      .getMany();
  }
}
