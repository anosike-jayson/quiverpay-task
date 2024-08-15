import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from 'src/Entities/character.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Character])],
  providers: [CharacterService],
  controllers: [CharacterController],
  exports: [CharacterService]
})
export class CharacterModule {}
