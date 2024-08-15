import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterModule } from './character/character.module';
import { LocationModule } from './location/location.module';
import { EpisodeModule } from './episode/episode.module';
import { CommentModule } from './comment/comment.module';
import { Character } from './Entities/character.entity';
import { Episode } from './Entities/episode.entity';
import { Location } from './Entities/location.entity';
import { Comment } from './Entities/comment.entity';
import { LocationController } from './location/location.controller';
import { CommentController } from './comment/comment.controller';
import { EpisodeController } from './episode/episode.controller';
import { CharacterController } from './character/character.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', 
      port: 5432,
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: 'myDatabase',
      entities: [Character, Location, Episode, Comment],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Character, Location, Episode, Comment]),
    CharacterModule,
    LocationModule,
    EpisodeModule,
    CommentModule,
  ],
  controllers: [LocationController, CommentController, EpisodeController, CharacterController],
  providers: [AppService],
})
export class AppModule {}
