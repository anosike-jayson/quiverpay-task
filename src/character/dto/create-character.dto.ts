import { IsString, IsNotEmpty, IsNumber, ArrayNotEmpty, IsArray } from 'class-validator';

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
  species: string;

  @IsString()
  origin: string;

  @IsString()
  status: string;

  @IsNumber()
  locationId: number;

  @IsArray()
  @ArrayNotEmpty()
  episodeIds: number[];
}
