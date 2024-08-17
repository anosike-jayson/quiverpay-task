import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CharacterService } from './character.service';
import { Character } from 'src/Entities/character.entity';
import { CreateCharacterDto } from './dto/create-character.dto';

@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  async create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.createCharacter(createCharacterDto);
  }

  @Get(':id/episodes')
  async getEpisodesForCharacter(@Param('id') id: number) {
    return this.characterService.getEpisodesForCharacter(id);
  }
  
  @Get()
  async getCharacters(
    @Query('sortBy') sortBy: string = 'name',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Query('gender') gender: string,
    @Query('status') status: string,
    @Query('location') location?: string,
  ): Promise<Character[]> {
    return this.characterService.getCharacters(sortBy, sortOrder, { gender, status, location });
  }
}
