import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './controller/events.controller';
import { EventsService } from './service/events.service';
import { Module } from '@nestjs/common';
import { Events } from './entities/event.entity';
import { Categories } from '../categories/entities/category.entity';
import { Players } from '../players/entities/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Events, Categories, Players])],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
