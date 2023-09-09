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
import { Players } from 'src/modules/players/entities/player.entity';
import { PlayersService } from 'src/modules/players/service/players.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
    @InjectRepository(Events)
    private readonly eventsRepository: Repository<Events>,
    @InjectRepository(Players)
    private readonly playersRepository: Repository<Players>,
    private readonly playersService: PlayersService,
  ) {}

  public async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Categories> {
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
    });

    const { id } = savedCategory;

    return this.categoriesRepository.findOne({
      select: {
        id: true,
        category: true,
      },
      where: { id },
    });
  }

  public async insertCategoryIntoPlayer(
    params: Array<string>,
  ): Promise<Categories> {
    const category = await this.categoriesRepository.findOne({
      where: {
        category: params['category'],
      },
      relations: {
        players: true,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category ${category} not found`);
    }

    await this.playersService.findOne(params['playerId']);

    const player = await this.playersRepository.findOneBy({
      id: params['playerId'],
    });

    const playerAllreadyHasCategory = await this.playersRepository.findOne({
      where: {
        id: params['playerId'],
        categories: {
          id: category.id,
        },
      },
    });

    if (playerAllreadyHasCategory) {
      throw new BadRequestException(
        `Player ${player.name} already has in ${category.category} category`,
      );
    }

    category.players.push(player);

    await this.categoriesRepository.save({
      ...category,
    });

    const { id } = category;

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
        name: true,
        value: true,
        operation: true,
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

  public async findOne(id: string): Promise<Categories> {
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
      where: { id },
      relations: ['events', 'players'],
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
      deleted_at: new Date(),
    });
  }
}
