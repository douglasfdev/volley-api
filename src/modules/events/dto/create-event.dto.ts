import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsUUID()
  @IsNotEmpty()
  readonly players?: string;

  @IsUUID()
  @IsNotEmpty()
  readonly categories?: string;

  @IsString()
  @IsNotEmpty()
  readonly operation?: string;

  @IsNumber()
  @IsNotEmpty()
  readonly value?: number;
}
