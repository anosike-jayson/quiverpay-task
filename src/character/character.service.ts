import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Character } from 'src/Entities/character.entity';
import { CreateCharacterDto } from './dto/create-character.dto';
import { LocationService } from 'src/location/location.service';
import { Episode } from 'src/Entities/episode.entity';
@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
    @InjectRepository(Episode)
    private episodeRepository: Repository<Episode>,
    private locationService: LocationService,
  ) {}

  async createCharacter(createCharacterDto: CreateCharacterDto): Promise<Character> {
    const { locationId, episodeIds = [], ...rest } = createCharacterDto; 
    
    const location = await this.locationService.getLocationById(locationId);
    if (!location) {
      throw new Error('Location not found');
    }
    const episodes = episodeIds && episodeIds.length > 0
      ? await this.episodeRepository.find({
          where: { id: In(episodeIds) }
        })
      : [];
  
    const character = this.characterRepository.create({
      ...rest,
      location, 
      episodes,
    });
  
    return await this.characterRepository.save(character);
  }

  
  async getCharacters(
    sortBy: 'first_name' | 'gender',
    sortOrder: 'ASC' | 'DESC'
  ): Promise<Character[]> {
    const query = this.characterRepository.createQueryBuilder('character');

    if (sortBy) {
      query.orderBy(`character.${sortBy}`, sortOrder);
    }

    return await query.getMany();
  }
}
