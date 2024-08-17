import { IsString, IsDateString } from 'class-validator';

export class CreateEpisodeDto {
  @IsString()
  name: string;

  @IsString()
  episodeCode: string;

  @IsDateString()
  releaseDate: string;
}