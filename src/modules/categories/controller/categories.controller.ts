import { UpdateCategoryDto } from './../dto/update-category.dto';
import { CreateCategoryDto } from './../dto/create-category.dto';
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

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Partial<Categories>> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(): Promise<Array<Categories>> {
    return this.categoriesService.findAll();
  }

  @Get('event/:id')
  findOne(@Param('id') id: string): Promise<Array<Events>> {
    return this.categoriesService.findByEvents(id);
  }

  @Patch(':id')
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
