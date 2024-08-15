import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
