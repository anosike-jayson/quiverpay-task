import { IsString, IsNotEmpty, IsNumber, ArrayNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  state_of_origin: string;

  @IsString()
  gender: string;

  @IsString()
  origin: string;

  @IsString()
  status: string;

  @IsNumber()
  locationId: number;

  @IsArray()
  @IsOptional()
  episodeIds: number[];
}
