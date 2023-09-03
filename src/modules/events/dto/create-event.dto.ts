import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { Categories } from 'src/modules/categories/entities/category.entity';
import { Players } from 'src/modules/players/entities/player.entity';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsArray()
  readonly players?: Array<Players>;

  @IsNotEmpty()
  @IsArray()
  readonly categories?: Array<Categories>;

  @IsString()
  @IsNotEmpty()
  readonly operation?: string;

  @IsNumber()
  @IsNotEmpty()
  readonly value?: number;
}
