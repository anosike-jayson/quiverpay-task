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

  async getEpisodesForCharacter(characterId: number): Promise<Episode[]> {
    return this.episodeRepository
      .createQueryBuilder('episode')
      .leftJoin('episode.characters', 'character')
      .where('character.id = :characterId', { characterId })
      .getMany();
  }

  
  async getCharacters(
    sortBy: string,
    sortOrder: 'ASC' | 'DESC',
    filters: any
  ): Promise<Character[]> {
    const query = this.characterRepository.createQueryBuilder('character');

    if (filters.gender) {
      query.andWhere('character.gender = :gender', { gender: filters.gender });
    }
    if (filters.status) {
      query.andWhere('character.status = :status', { status: filters.status });
    }
    if (filters.location) {
      query.andWhere('character.location = :location', { location: filters.location });
    }
    if (sortBy === 'name') {
      query.orderBy('character.first_name', sortOrder).addOrderBy('character.last_name', sortOrder);
    } else if (sortBy === 'gender') {
      query.orderBy('character.gender', sortOrder);
    }
  
    return await query.getMany();
  }
  
}
