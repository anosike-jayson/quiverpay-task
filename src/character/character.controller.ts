import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CharacterService } from './character.service';
import { Character } from 'src/Entities/character.entity';
import { CreateCharacterDto } from './dto/create-character.dto';

@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  async create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }
  @Get()
  async getCharacters(
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Query('gender') gender: string,
    @Query('status') status: string,
    @Query('location') location: string,
  ): Promise<Character[]> {
    const filters = { gender, status, location };
    return this.characterService.getCharacters(sortBy, sortOrder, filters);
  }
}
