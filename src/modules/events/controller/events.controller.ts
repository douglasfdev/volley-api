import { Events } from '../entities/event.entity';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventsService } from '../service/events.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Categories } from 'src/modules/categories/entities/category.entity';

@Controller({
  path: 'events',
  version: '1',
})
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createEventDto: CreateEventDto): Promise<Partial<Events>> {
    return this.eventsService.initEvent(createEventDto);
  }

  @Post(':event/player/:playerId')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  insertEventIntoPlayer(
    @Param() params: Array<string>,
  ): Promise<Partial<Events>> {
    return this.eventsService.insertEventIntoPlayer(params);
  }

  @Post(':event/category/:categoryId')
  insertEventIntoCategory(@Param() params: Array<string>): Promise<Events> {
    return this.eventsService.insertEventIntoCategory(params);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Array<Events>> {
    return this.eventsService.findAll();
  }

  @Get('category/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<Partial<Array<Categories>>> {
    return this.eventsService.listByCategories(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(@Param('id') id: string): Promise<Partial<CreateEventDto>> {
    return this.eventsService.updateToDone(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.eventsService.remove(id);
  }
}
