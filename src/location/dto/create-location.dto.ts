import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly latitude: number;

  @IsNotEmpty()
  @IsNumber()
  readonly longitude: number;
}