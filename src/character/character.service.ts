import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from 'src/Entities/character.entity';
@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
  ) {}

  async getCharacters(sortBy: string, sortOrder: 'ASC' | 'DESC', filters: any): Promise<Character[]> {
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
    if (sortBy) {
      query.orderBy(`character.${sortBy}`, sortOrder);
    }

    return await query.getMany();
  }
}
