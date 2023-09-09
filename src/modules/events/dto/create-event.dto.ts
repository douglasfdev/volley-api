import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly operation: string;

  @IsNumber()
  @IsNotEmpty()
  readonly value: number;
}
