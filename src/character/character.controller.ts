import { Controller, Get, Query } from '@nestjs/common';
import { CharacterService } from './character.service';
import { Character } from 'src/Entities/character.entity';

@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

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
