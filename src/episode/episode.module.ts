import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodeService } from './episode.service';
import { EpisodeController } from './episode.controller';
import { Episode } from 'src/Entities/episode.entity';
import { CommentModule } from '../comment/comment.module'; 
@Module({
  imports: [
    TypeOrmModule.forFeature([Episode]),
    CommentModule,
  ],
  providers: [EpisodeService],
  controllers: [EpisodeController],
  exports: [EpisodeService],
})
export class EpisodeModule {}
