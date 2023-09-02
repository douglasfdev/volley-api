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

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Array<Events>> {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<Partial<Events>> {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Param('id') id: string,
    @Body() createEventDto: CreateEventDto,
  ): Promise<CreateEventDto> {
    return this.eventsService.updateToProgress(id, createEventDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.eventsService.remove(id);
  }
}
