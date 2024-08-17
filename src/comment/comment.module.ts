import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/Entities/comment.entity';
import { Episode } from 'src/Entities/episode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Episode])],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService]
})
export class CommentModule {}
