import { Controller, Post, Body, Param, Put, NotFoundException, Get } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/create-episode.dto';
import { Episode } from 'src/Entities/episode.entity';
import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';

@Controller('episodes')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Post()
  async createEpisode(@Body() createEpisodeDto: CreateEpisodeDto): Promise<Episode> {
    return this.episodeService.createEpisode(createEpisodeDto);
  }

  @Get()
  async getEpisodes(): Promise<any[]> {
    return this.episodeService.getEpisodes();
  }

  @Put(':id')
  async updateEpisode(
    @Param('id') id: number,
    @Body() updateEpisodeDto: UpdateEpisodeDto,
  ): Promise<Episode> {
    const episode = await this.episodeService.findEpisodeById(id);
    if (!episode) {
      throw new NotFoundException(`Episode with ID ${id} not found`);
    }
    return this.episodeService.updateEpisode(id, updateEpisodeDto);
  }

  @Get(':id/characters')
  async getEpisodesForCharacter(@Param('id') characterId: number): Promise<Episode[]> {
    return this.episodeService.getEpisodesForCharacter(characterId);
  }
}
