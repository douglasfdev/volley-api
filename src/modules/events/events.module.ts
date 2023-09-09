import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './controller/events.controller';
import { EventsService } from './service/events.service';
import { Module } from '@nestjs/common';
import { Events } from './entities/event.entity';
import { Categories } from '../categories/entities/category.entity';
import { Players } from '../players/entities/player.entity';
import { PlayersService } from '../players/service/players.service';
import { CategoriesService } from '../categories/service/categories.service';
import { CategoriesModule } from '../categories/categories.module';
import { PlayersModule } from '../players/players.module';

@Module({
  imports: [TypeOrmModule.forFeature([Events, Categories, Players])],
  controllers: [EventsController],
  providers: [EventsService, PlayersService, CategoriesService],
  exports: [EventsService],
})
export class EventsModule {}
