import { Players } from './entities/player.entity';
import { PlayersController } from './controller/players.controller';
import { Module } from '@nestjs/common';
import { PlayersService } from './service/players.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Players])],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}
