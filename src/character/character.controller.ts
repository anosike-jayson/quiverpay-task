import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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
  @Get()
  async getSortedCharacters(
    @Query('sortBy') sortBy: 'first_name' | 'gender',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
  ): Promise<Character[]> {
    return this.characterService.getCharacters(sortBy, sortOrder);
  }
}
