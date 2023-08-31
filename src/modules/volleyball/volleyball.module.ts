import { Module } from '@nestjs/common';
import { VolleyballService } from './volleyball.service';
import { VolleyballController } from './volleyball.controller';

@Module({
  controllers: [VolleyballController],
  providers: [VolleyballService]
})
export class VolleyballModule {}
