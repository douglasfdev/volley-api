import { Players } from '../entities/player.entity';
import { UpdatePlayerDto } from './../dto/update-player.dto';
import { CreatePlayerDto } from './../dto/create-player.dto';
import { PlayersService } from './../service/players.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { PlayersValidationParametersPipe } from '../pipes/players.validation.parameters.pipe';

@Controller({
  path: 'players',
  version: '1',
})
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createPlayerDto: CreatePlayerDto,
  ): Promise<Partial<CreatePlayerDto>> {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Array<UpdatePlayerDto>> {
    return this.playersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('id', PlayersValidationParametersPipe) id: string,
  ): Promise<Partial<Players>> {
    return this.playersService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Param('id', PlayersValidationParametersPipe) id: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ): Promise<UpdatePlayerDto> {
    return this.playersService.update(id, updatePlayerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id', PlayersValidationParametersPipe) id: string,
  ): Promise<void> {
    return this.playersService.remove(id);
  }
}
