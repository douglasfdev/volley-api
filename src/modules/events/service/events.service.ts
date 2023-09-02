import { Events } from './../entities/event.entity';
import { UpdateEventDto } from './../dto/update-event.dto';
import { CreateEventDto } from './../dto/create-event.dto';
import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEnumType } from 'src/enums';
import { Players } from 'src/modules/players/entities/player.entity';
import { Categories } from 'src/modules/categories/entities/category.entity';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    @InjectRepository(Events)
    private readonly eventRepository: Repository<Events>,
    @InjectRepository(Players)
    private readonly playerRepository: Repository<Players>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  public async initEvent(createEventDto: CreateEventDto) {
    const players = await this.playerRepository.findOneBy({
      id: createEventDto.players,
    });
    const categories = await this.categoriesRepository.findOneBy({
      id: createEventDto.categories,
    });

    if (!players) {
      throw new NotFoundException(
        `Player id: ${createEventDto.players} not found`,
      );
    }

    if (!categories) {
      throw new NotFoundException(
        `Category id: ${createEventDto.categories} not found`,
      );
    }

    const createdEvent = this.eventRepository.create({
      ...createEventDto,
      players,
      categories,
    });

    await this.categoriesRepository.update(categories.id, {
      status: EventEnumType.IN_PROGRESS,
    });

    const savedEvent = await this.eventRepository.save(createdEvent);

    const { id, name } = savedEvent;

    return {
      id,
      name,
      playerId: players.id,
      categorieId: categories.id,
    };
  }

  public async findAll(): Promise<Array<Events>> {
    return this.eventRepository.find({
      select: {
        id: true,
        name: true,
      },
    });
  }

  public async findOne(id: string): Promise<Partial<Events>> {
    const event = await this.eventRepository.findOneBy({ id });

    if (!event) {
      throw new NotFoundException(`Event ${id} not found`);
    }

    const { name } = event;

    return {
      id,
      name,
    };
  }

  public async updateToProgress(id: string, createEventDto: CreateEventDto) {
    const event = await this.eventRepository.findOneBy({ id });
    const players = await this.playerRepository.findOneBy({
      id: createEventDto.players,
    });
    const categories = await this.categoriesRepository.findOneBy({
      id: createEventDto.categories,
    });

    if (!event) {
      throw new NotFoundException(`Event ${id} not found`);
    }

    if (!players) {
      throw new NotFoundException(
        `Player id: ${createEventDto.players} not found`,
      );
    }

    if (!categories) {
      throw new NotFoundException(
        `Category id: ${createEventDto.categories} not found`,
      );
    }

    this.eventRepository.update(id, {
      active: EventEnumType.IN_PROGRESS,
      players,
      categories,
    });

    const { name } = event;

    return {
      id,
      name,
      status: event.active,
      categoryId: categories,
      playerId: players,
    };
  }

  public async remove(id: string) {
    const event = await this.eventRepository.findOneBy({ id });

    if (!event) {
      throw new NotFoundException(`Event ${id} not found`);
    }

    await this.eventRepository.update(id, {
      active: EventEnumType.CANCELLED,
      deletedAt: new Date(),
    });
  }
}
