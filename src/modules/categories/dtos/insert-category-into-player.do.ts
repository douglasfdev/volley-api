import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Players } from 'src/modules/players/entities/player.entity';

export class InsertCategoryIntoPlayerDto {
  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @IsArray()
  @ArrayMinSize(1)
  readonly players: Array<Players>;
}
