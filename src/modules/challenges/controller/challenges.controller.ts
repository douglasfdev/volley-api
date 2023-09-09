import { ChallengesService } from './../service/challenges.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateChallengeDto } from '../dto/create-challenge.dto';
import { UpdateChallengeDto } from '../dto/update-challenge.dto';
import { Challenges } from '../entities/challenge.entity';

@Controller({
  path: 'challenges',
  version: '1',
})
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  create(@Body() createChallengeDto: CreateChallengeDto): Promise<Challenges> {
    return this.challengesService.create(createChallengeDto);
  }

  @Post(':challenged/accept/:requester/challenge/:challenge')
  accept(@Param() params: Array<string>): Promise<Challenges> {
    return this.challengesService.acceptChallenge(params);
  }

  @Get()
  findAll() {
    return this.challengesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.challengesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
  ) {
    return this.challengesService.update(+id, updateChallengeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.challengesService.remove(+id);
  }
}
