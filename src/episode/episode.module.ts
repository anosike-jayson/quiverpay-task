import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodeService } from './episode.service';
import { EpisodeController } from './episode.controller';
import { Episode } from 'src/Entities/episode.entity';
import { CommentModule } from '../comment/comment.module'; 
import { Comment } from 'src/Entities/comment.entity';
import { Character } from 'src/Entities/character.entity';
@Module({
  providers: [EpisodeService],
  controllers: [EpisodeController],
  imports: [
    TypeOrmModule.forFeature([Episode, Character, Comment]),
  ],
  exports: [EpisodeService],
})
export class EpisodeModule {}
