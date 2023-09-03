import { Events } from './../entities/event.entity';
import { CreateEventDto } from './../dto/create-event.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEnumType, EventEnumType } from 'src/enums';
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

    const event = new Events();
    event.categories = await [categories];
    event.players = [players];

    await this.categoriesRepository.update(categories.id, {
      status: CategoryEnumType.ACTIVE,
    });

    const savedEvent = await this.eventRepository.save({
      ...event,
      active: EventEnumType.IN_PROGRESS,
    });

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
        players: {
          id: true,
          ranking: true,
          rankingPosition: true,
        },
        categories: {
          id: true,
          category: true,
          description: true,
        },
      },
      relations: ['players', 'categories'],
    });
  }

  public async listByCategories(
    id: string,
  ): Promise<Partial<Array<Categories>>> {
    const category = await this.categoriesRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException(`Category ${id} not found`);
    }

    return this.categoriesRepository.find({
      select: {
        id: true,
        category: true,
        description: true,
        events: {
          id: true,
          name: true,
          operation: true,
          value: true,
        },
      },
      where: { id },
      relations: ['events', 'players'],
    });
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
      players: [players],
      categories: [categories],
    });

    const { name } = event;

    return {
      id,
      name,
      status: event.active,
      categoryId: categories.id,
      playerId: players.id,
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
