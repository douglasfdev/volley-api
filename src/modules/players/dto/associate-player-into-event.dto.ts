import { IsArray, IsNotEmpty } from 'class-validator';
import { Categories } from 'src/modules/categories/entities/category.entity';
import { Events } from 'src/modules/events/entities/event.entity';

export class PlayerIntoEventDto {
  @IsNotEmpty()
  readonly playerId: string;

  @IsNotEmpty()
  readonly rankingPosition: number;

  @IsArray()
  readonly events?: Array<Events>;

  @IsArray()
  readonly categories?: Array<Categories>;
}
