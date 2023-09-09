import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { CategoriesService } from '../service/categories.service';
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
} from '@nestjs/common';
import { Categories } from '../entities/category.entity';
import { Events } from 'src/modules/events/entities/event.entity';

@Controller({
  path: 'categories',
  version: '1',
})
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Categories> {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Post(':category/player/:playerId')
  insertCategoryIntoPlayers(
    @Param() params: Array<string>,
  ): Promise<Categories> {
    return this.categoriesService.insertCategoryIntoPlayer(params);
  }

  @Get()
  findAll(): Promise<Array<Categories>> {
    return this.categoriesService.findAll();
  }

  @Get('event/:id')
  findOne(@Param('id') id: string): Promise<Array<Events>> {
    return this.categoriesService.findByEvents(id);
  }

  @Get(':id')
  findOneById(@Param('id') id: string): Promise<Categories> {
    return this.categoriesService.findOneCategory(id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Partial<Categories>> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
