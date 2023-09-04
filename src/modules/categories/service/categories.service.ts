import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';
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

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
    @InjectRepository(Events)
    private readonly eventsRepository: Repository<Events>,
    private readonly eventService: EventsService,
  ) {}

  public async create(createCategoryDto: CreateCategoryDto) {
    const { category } = createCategoryDto;

    const categoryExists = await this.categoriesRepository.findOne({
      where: { category },
    });

    if (categoryExists) {
      throw new BadRequestException(`Category ${category} already exists`);
    }

    const categories = new Categories();
    categories.category = category;
    categories.description = createCategoryDto.description;
    categories.events = createCategoryDto.events;

    const savedCategory = await this.categoriesRepository.save({
      ...categories,
      events: categories.events,
    });

    const { id, description, events } = savedCategory;

    categories.events.map(async (event) => {
      const initEvent = await this.eventService.initEvent({
        name: event.name,
        operation: event.operation,
        value: event.value,
        categories: [savedCategory],
      });

      await this.eventsRepository.save(initEvent);
    });

    return {
      id,
      category,
      description,
      events,
    };
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

  public async findByEvents(id: string) {
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
