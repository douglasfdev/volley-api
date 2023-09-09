import { Players } from './entities/player.entity';
import { PlayersController } from './controller/players.controller';
import { Module } from '@nestjs/common';
import { PlayersService } from './service/players.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from '../events/entities/event.entity';
import { Categories } from '../categories/entities/category.entity';
import { EventsService } from '../events/service/events.service';
import { CategoriesService } from '../categories/service/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Players, Events, Categories])],
  controllers: [PlayersController],
  providers: [PlayersService, EventsService, CategoriesService],
  exports: [PlayersService],
})
export class PlayersModule {}
