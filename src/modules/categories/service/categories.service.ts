import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Categories } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEnumType } from 'src/enums';
import { Events } from 'src/modules/events/entities/event.entity';
import { EventsService } from 'src/modules/events/service/events.service';
import { Players } from 'src/modules/players/entities/player.entity';
import { PlayersService } from 'src/modules/players/service/players.service';
import { InsertCategoryIntoPlayerDto } from '../dtos/insert-category-into-player.do';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
    @InjectRepository(Events)
    private readonly eventsRepository: Repository<Events>,
    private readonly eventService: EventsService,
    @InjectRepository(Players)
    private readonly playersRepository: Repository<Players>,
    private readonly playersService: PlayersService,
  ) {}

  public async createCategoryWithEvent(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Partial<Categories>> {
    const { category } = createCategoryDto;

    const categoryExists = await this.categoriesRepository.findOneBy({
      category,
    });

    if (categoryExists) {
      throw new BadRequestException(`Category ${category} already exists`);
    }

    const categories = this.categoriesRepository.create({
      ...createCategoryDto,
    });

    const savedCategory = await this.categoriesRepository.save({
      ...categories,
      events: categories.events,
      players: categories.players,
    });

    const { id, description, events, players } = savedCategory;

    categories.events.map(async (event) => {
      const initEvent = await this.eventService.initEvent({
        name: event.name,
        operation: event.operation,
        value: event.value,
        categories: [savedCategory],
        players,
      });

      await this.eventsRepository.save(initEvent);
    });

    return {
      id,
      category,
      description,
      events,
      players,
    };
  }

  public async insertCategoryIntoPlayer(
    insertCategoryIntoPlayerDto: InsertCategoryIntoPlayerDto,
  ): Promise<Categories> {
    const { category, players } = insertCategoryIntoPlayerDto;
    const findCategory = await this.categoriesRepository.findOneBy({
      category,
    });

    const users = insertCategoryIntoPlayerDto.players.map((player) => {
      return this.playersService.findOne(player.id);
    });

    if (!users) {
      throw new NotFoundException(`Player not found`);
    }

    if (!findCategory) {
      throw new NotFoundException(
        `Category ${insertCategoryIntoPlayerDto.category} not found`,
      );
    }

    const createdCategory = this.categoriesRepository.create({
      ...findCategory,
      players,
    });

    await this.categoriesRepository.save(createdCategory);

    const { id } = createdCategory;

    return this.categoriesRepository.findOne({
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
        players: {
          id: true,
          name: true,
          ranking: true,
          rankingPosition: true,
        },
      },
      relations: ['players', 'events'],
      where: { id },
    });
  }

  public async findAll(): Promise<Array<Categories>> {
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
        players: {
          id: true,
          name: true,
          ranking: true,
          rankingPosition: true,
        },
      },
      relations: ['events', 'players'],
    });
  }

  public async findByEvents(id: string): Promise<Array<Events>> {
    return this.eventsRepository.find({
      select: {
        id: true,
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
      where: { id },
      relations: ['categories', 'players'],
    });
  }

  public async findOneCategory(id: string): Promise<Categories> {
    const category = await this.categoriesRepository.findOne({
      select: {
        id: true,
        category: true,
        status: true,
        events: {
          id: true,
          name: true,
          operation: true,
          value: true,
        },
        players: {
          id: true,
          name: true,
          ranking: true,
          rankingPosition: true,
        },
      },
      relations: ['events', 'players'],
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category ${id} not found`);
    }

    return category;
  }

  public async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Categories> {
    const category = await this.categoriesRepository.preload({
      id,
      ...updateCategoryDto,
    });

    if (!category) {
      throw new NotFoundException(`Category ${id} found`);
    }

    return this.categoriesRepository.save(category);
  }

  public async remove(id: string): Promise<void> {
    const category = await this.categoriesRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException(`Category ${id} found`);
    }

    await this.categoriesRepository.update(id, {
      status: CategoryEnumType.INACTIVE,
      deletedAt: new Date(),
    });
  }
}
