import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Episode } from 'src/Entities/episode.entity';
import { CreateCommentDto } from '../comment/dto/create-comment.dto';
import { Comment } from 'src/Entities/comment.entity';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/create-episode.dto';
import { Character } from 'src/Entities/character.entity';

@Injectable()
export class EpisodeService {
  constructor(
    @InjectRepository(Episode)
    private episodeRepository: Repository<Episode>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
  ) {}

 
  async createEpisode(createEpisodeDto: CreateEpisodeDto): Promise<Episode> {
    const { characterIds, commentIds, ...rest } = createEpisodeDto;

    const characters = characterIds && characterIds.length > 0
      ? await this.characterRepository.find({
          where: { id: In(characterIds) }
        })
      : [];

    const comments = commentIds && commentIds.length > 0
      ? await this.commentRepository.find({
          where: { id: In(commentIds) }
        })
      : [];

    const episode = this.episodeRepository.create({
      ...rest,
      characters,
      episode_comments: comments,
    });

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
        'COUNT(comment.id) AS commentCount',
      ])
      .groupBy('episode.id')
      .addGroupBy('episode.name')
      .addGroupBy('episode.release_date')
      .addGroupBy('episode.episode_code')
      .getRawMany();
      
    return result.map(raw => ({
      id: raw.episode_id,
      name: raw.episode_name,
      releaseDate: raw.episode_release_date,
      episodeCode: raw.episode_episode_code,
      commentCount: parseInt(raw.commentcount, 10)|| 0,
    }));  
  }
  

  public async getEpisodeById(id: number): Promise<Episode> {
    const episode = await this.episodeRepository.findOne({
      where: { id },
      relations: ['characters', 'episode_comments'], 
    });

    if (!episode) {
      throw new NotFoundException(`Episode with ID ${id} not found`);
    }

    return episode;
  }

  async getEpisodesForCharacter(characterId: number): Promise<Episode[]> {
    return this.episodeRepository
      .createQueryBuilder('episode')
      .leftJoin('episode.characters', 'character')
      .where('character.id = :characterId', { characterId })
      .getMany();
  }

  async updateEpisode(id: number, updateEpisodeDto: UpdateEpisodeDto): Promise<Episode> {
    const episode = await this.episodeRepository.findOne({ where: { id } });
    if (!episode) {
      throw new NotFoundException('Episode not found');
    }

    const { characterIds, commentsIds, ...rest } = updateEpisodeDto;

    if (characterIds) {
      const episodeCharacters = characterIds.length > 0
        ? await this.characterRepository.findBy({ id: In(characterIds) })
        : [];
      episode.characters = episodeCharacters;
    }

    if (commentsIds) {
      const episodeComments = commentsIds.length > 0
        ? await this.commentRepository.findBy({ id: In(commentsIds) })
        : [];
      episode.episode_comments = episodeComments;
    }

    Object.assign(episode, rest);

    return this.episodeRepository.save(episode);
  }

  async findEpisodeById(id: number): Promise<Episode | undefined> {
    return this.episodeRepository.findOne({ where: { id } });
  }
}
