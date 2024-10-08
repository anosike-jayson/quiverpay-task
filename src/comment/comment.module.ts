import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/Entities/comment.entity';
import { EpisodeModule } from 'src/episode/episode.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    EpisodeModule,
  ],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService]
})
export class CommentModule {}
