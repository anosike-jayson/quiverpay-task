import { IsString, IsNotEmpty, IsOptional, IsDateString, IsArray, IsInt } from 'class-validator';

export class CreateEpisodeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  release_date: Date;

  @IsString()
  @IsNotEmpty()
  episode_code: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  characterIds: number[]; 
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  commentIds: number[];  
}

export class UpdateEpisodeDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsDateString()
  release_date: Date;

  @IsOptional()
  @IsString()
  episode_code: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  characterIds: number[]; 

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  commentsIds: number[]; 
}
