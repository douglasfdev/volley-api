import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VolleyballService } from './volleyball.service';
import { CreateVolleyballDto } from './dto/create-volleyball.dto';
import { UpdateVolleyballDto } from './dto/update-volleyball.dto';

@Controller('volleyball')
export class VolleyballController {
  constructor(private readonly volleyballService: VolleyballService) {}

  @Post()
  create(@Body() createVolleyballDto: CreateVolleyballDto) {
    return this.volleyballService.create(createVolleyballDto);
  }

  @Get()
  findAll() {
    return this.volleyballService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.volleyballService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVolleyballDto: UpdateVolleyballDto) {
    return this.volleyballService.update(+id, updateVolleyballDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.volleyballService.remove(+id);
  }
}
