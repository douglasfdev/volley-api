import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { Players } from 'src/modules/players/entities/player.entity';

export class CreateChallengeDto {
  @IsNotEmpty()
  @IsDateString()
  challengeDateTime: string;

  @IsNotEmpty()
  requester: Players;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  challenged: Array<Players>;
}
