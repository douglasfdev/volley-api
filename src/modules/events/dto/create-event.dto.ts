import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsUUID()
  readonly players?: string;

  @IsUUID()
  readonly categories?: string;
}
