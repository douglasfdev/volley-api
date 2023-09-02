import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './controller/categories.controller';
import { CategoriesService } from './service/categories.service';
import { Module } from '@nestjs/common';
import { Categories } from './entities/category.entity';
import { Events } from '../events/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories, Events])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
