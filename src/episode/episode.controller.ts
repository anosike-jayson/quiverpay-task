import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';
import { Episode } from 'src/Entities/episode.entity';
import { CreateEpisodeDto } from './dto/create-episode.dto';

@Controller('episodes')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Post()
  async createEpisode(@Body() createEpisodeDto: CreateEpisodeDto): Promise<Episode> {
    return this.episodeService.createEpisode(createEpisodeDto);
  }
  @Get()
  async getAllEpisodes() {
    return this.episodeService.getEpisodes();
  }

  @Post(':id/comments')
  async addComment(@Param('id') episodeId: number, @Body() createCommentDto: CreateCommentDto) {
    return this.episodeService.addComment(episodeId, createCommentDto);
  }

  @Get(':id/characters')
  async getEpisodesForCharacter(@Param('id') characterId: number) {
    return this.episodeService.getEpisodesForCharacter(characterId);
  }
}
