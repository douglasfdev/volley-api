import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Events } from 'src/modules/events/entities/event.entity';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Array<Events>;
}
