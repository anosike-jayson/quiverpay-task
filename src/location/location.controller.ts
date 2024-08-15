import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from 'src/Entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async create(@Body() createLocationDto: CreateLocationDto): Promise<Location> {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  async findAll(): Promise<Location[]> {
    return this.locationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Location> {
    return this.locationService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateLocationDto: CreateLocationDto): Promise<Location> {
    return this.locationService.update(id, updateLocationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.locationService.remove(id);
  }
}
