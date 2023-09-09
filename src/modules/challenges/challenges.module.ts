import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersService } from '../players/service/players.service';
import { ChallengesController } from './controller/challenges.controller';
import { ChallengesService } from './service/challenges.service';
import { Module } from '@nestjs/common';
import { Challenges } from './entities/challenge.entity';
import { Players } from '../players/entities/player.entity';
import { Events } from '../events/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Challenges, Players, Events])],
  controllers: [ChallengesController],
  providers: [ChallengesService, PlayersService],
  exports: [ChallengesService],
})
export class ChallengesModule {}
