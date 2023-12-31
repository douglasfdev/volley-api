import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';
import { Players } from '../entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerEnumType } from 'src/enums';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Players)
    private readonly playersRepository: Repository<Players>,
  ) {}

  public async create(
    createPlayerDto: CreatePlayerDto,
  ): Promise<Partial<Players>> {
    const createdPlayer = this.playersRepository.create({ ...createPlayerDto });

    await this.playersRepository.save(createdPlayer);

    const { id, email, cellphone, name, ranking, rankingPosition } =
      createdPlayer;

    return {
      id,
      email,
      cellphone,
      name,
      ranking,
      rankingPosition,
    };
  }

  public async findAll(): Promise<Array<Players>> {
    return this.playersRepository.find({
      select: {
        id: true,
        name: true,
        ranking: true,
        rankingPosition: true,
        events: {
          id: true,
          name: true,
          operation: true,
          value: true,
        },
        categories: {
          id: true,
          category: true,
          description: true,
        },
      },
      relations: ['events', 'categories'],
    });
  }

  public async findOne(id: string): Promise<Players> {
    const player = await this.playersRepository.findOneBy({ id });

    if (!player) {
      throw new NotFoundException(`Player with id: ${id} not found`);
    }

    return this.playersRepository.findOne({
      select: {
        cellphone: true,
        name: true,
        email: true,
        ranking: true,
        rankingPosition: true,
      },
      where: { id },
    });
  }

  public async update(
    id: string,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<UpdatePlayerDto> {
    const player = await this.playersRepository.findOneBy({ id });

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    this.playersRepository.update(id, {
      ...updatePlayerDto,
      status: PlayerEnumType.ACTIVE,
      deleted_at: null,
    });

    const { cellphone, name, email } = player;

    return {
      cellphone,
      name,
      email,
    };
  }

  public async remove(id: string): Promise<void> {
    const player = await this.playersRepository.findOneBy({ id });

    if (!player) {
      throw new NotFoundException(`Player with ${id} not found`);
    }

    await this.playersRepository.update(id, {
      status: PlayerEnumType.INACTIVE,
      deleted_at: new Date(),
    });
  }
}
