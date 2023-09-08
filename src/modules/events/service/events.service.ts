import { Events } from './../entities/event.entity';
import { CreateEventDto } from './../dto/create-event.dto';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEnumType, EventEnumType } from 'src/enums';
import { Players } from 'src/modules/players/entities/player.entity';
import { Categories } from 'src/modules/categories/entities/category.entity';
import { PlayersService } from 'src/modules/players/service/players.service';

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
    private readonly playersService: PlayersService,
  ) {}

  public async initEvent(createEventDto: CreateEventDto) {
    const event = this.eventRepository.create({
      ...createEventDto,
    });

    const categoryId = event.categories.map((category) => category.id);
    const playerId = event.players.map((player) => player.id);

    await this.categoriesRepository.update(categoryId, {
      status: CategoryEnumType.ACTIVE,
    });

    const savedEvent = await this.eventRepository.save({
      ...event,
      categories: event.categories,
      active: EventEnumType.IN_PROGRESS,
    });

    const { id, name } = savedEvent;

    return {
      id,
      name,
      playerId,
      categoryId,
    };
  }

  public async insertEventIntoPlayer(params: Array<string>): Promise<Events> {
    const event = await this.eventRepository.findOne({
      where: {
        name: params['event'],
      },
      relations: {
        players: true,
      },
    });

    const player = await this.playerRepository.findOneBy({
      id: params['playerId'],
    });

    await this.playersService.findOne(params['playerId']);

    if (!event) {
      throw new NotFoundException(`Event ${params['event']} not found`);
    }

    if (!player) {
      throw new NotFoundException(`Player ${params['playerId']} not found`);
    }

    const playerAllreadyHasEvent = await this.playerRepository.findOne({
      where: {
        id: params['playerId'],
        events: {
          id: event.id,
        },
      },
    });

    if (playerAllreadyHasEvent) {
      throw new BadRequestException(
        `Player ${player.name} already has in ${event.name} event`,
      );
    }

    event.players.push(player);

    await this.eventRepository.save({ ...event });

    const { id } = event;

    return this.eventRepository.findOne({
      select: {
        id: true,
        name: true,
        operation: true,
        value: true,
        players: {
          id: true,
          name: true,
          ranking: true,
          rankingPosition: true,
        },
        categories: {
          id: true,
          category: true,
          description: true,
          status: true,
        },
      },
      relations: ['players', 'categories'],
      where: { id },
    });
  }

  public async findAll(): Promise<Array<Events>> {
    return this.eventRepository.find({
      select: {
        id: true,
        name: true,
        players: {
          id: true,
          name: true,
          email: true,
          ranking: true,
          rankingPosition: true,
        },
        categories: {
          id: true,
          category: true,
          description: true,
          status: true,
        },
      },
      relations: ['players', 'categories'],
    });
  }

  public async findOne(id: string): Promise<Events> {
    const event = await this.eventRepository.findOne({
      select: {
        id: true,
        name: true,
        players: {
          id: true,
          name: true,
          email: true,
          ranking: true,
          rankingPosition: true,
        },
        categories: {
          id: true,
          category: true,
          description: true,
          status: true,
        },
      },
      relations: ['players', 'categories'],
      where: { id },
    });

    if (!event) {
      throw new NotFoundException(`Event ${id} not found`);
    }

    return event;
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

  public async updateToDone(id: string) {
    const event = await this.eventRepository.findOneBy({ id });

    if (!event) {
      throw new NotFoundException(`Event ${id} not found`);
    }

    await this.eventRepository.update(id, {
      active: EventEnumType.DONE,
    });

    const { name, operation, value, players, categories } = event;

    return {
      eventId: id,
      eventName: name,
      operation,
      value,
      players,
      categories,
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
