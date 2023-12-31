import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './controller/categories.controller';
import { CategoriesService } from './service/categories.service';
import { Module } from '@nestjs/common';
import { Categories } from './entities/category.entity';
import { Events } from '../events/entities/event.entity';
import { EventsService } from '../events/service/events.service';
import { Players } from '../players/entities/player.entity';
import { PlayersService } from '../players/service/players.service';
import { PlayersModule } from '../players/players.module';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([Categories, Events, Players])],
  controllers: [CategoriesController],
  providers: [CategoriesService, EventsService, PlayersService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
