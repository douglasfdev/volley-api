import { ChallengesController } from './controller/challenges.controller';
import { ChallengesService } from './service/challenges.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ChallengesController],
  providers: [ChallengesService],
})
export class ChallengesModule {}
