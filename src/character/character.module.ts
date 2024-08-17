import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from 'src/Entities/character.entity';
import { LocationModule } from 'src/location/location.module';
import { Episode } from 'src/Entities/episode.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Character, Episode]),
    LocationModule,
  ],
  providers: [CharacterService],
  controllers: [CharacterController],
  exports: [CharacterService]
})
export class CharacterModule {}
