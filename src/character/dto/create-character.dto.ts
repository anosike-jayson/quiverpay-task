import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  gender: string;

  @IsString()
  species: string;

  @IsString()
  origin: string;

  @IsString()
  status: string;
}
