import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from 'src/Entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const location = this.locationRepository.create(createLocationDto);
    return this.locationRepository.save(location);
  }

  async findAll(): Promise<Location[]> {
    return this.locationRepository.find();
  }

  async findOne(id: number): Promise<Location> {
    return this.locationRepository.findOneBy({id})
  }

  async update(id: number, updateLocationDto: CreateLocationDto): Promise<Location> {
    await this.locationRepository.update(id, updateLocationDto);
    return this.findOne(id);
  }

  async getLocationById(id: number): Promise<Location> {
    const location = await this.locationRepository.findOne({ where: { id } });
    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
    return location;
  }

  async remove(id: number): Promise<void> {
    await this.locationRepository.delete(id);
  }
}
