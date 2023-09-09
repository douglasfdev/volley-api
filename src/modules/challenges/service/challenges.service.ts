import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenges } from '../entities/challenge.entity';
import { Repository } from 'typeorm';
import { CreateChallengeDto } from '../dto/create-challenge.dto';
import { UpdateChallengeDto } from '../dto/update-challenge.dto';
import { PlayersService } from 'src/modules/players/service/players.service';
import { Events } from 'src/modules/events/entities/event.entity';
import { Players } from 'src/modules/players/entities/player.entity';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenges)
    private readonly challengesRepository: Repository<Challenges>,
    private readonly playersService: PlayersService,
    @InjectRepository(Players)
    private readonly playerRepository: Repository<Players>,
    @InjectRepository(Events)
    private readonly eventRepository: Repository<Events>,
  ) {}

  public async create(
    createChallengeDto: CreateChallengeDto,
  ): Promise<Challenges> {
    const requester = await this.playersService.findOne(
      createChallengeDto.requester.id,
    );

    if (!requester) {
      throw new NotFoundException(
        `Player ${createChallengeDto.requester.id} not found`,
      );
    }

    const [challengedIds] = createChallengeDto.challenged.map(
      (player) => player.id,
    );

    const challenged = await this.playerRepository.findOneBy({
      id: challengedIds,
    });

    if (!challenged) {
      throw new NotFoundException(`Player with id ${challengedIds} not found`);
    }

    const challengeObject = this.challengesRepository.create({
      ...createChallengeDto,
    });

    // TODO implements the validation if player allready challenged the other

    const challenge = await this.challengesRepository.save({
      ...challengeObject,
      requester,
      challenged: [challenged],
    });

    const { id } = challenge;

    return this.challengesRepository.findOne({
      select: {
        id: true,
        challengeDateTime: true,
        requester: {
          id: true,
          name: true,
          email: true,
          cellphone: true,
        },
      },
      where: { id },
      relations: ['requester'],
    });
  }

  public async acceptChallenge(params: Array<string>): Promise<Challenges> {
    const requester = await this.playerRepository.findOneBy({
      id: params['requester'],
    });

    if (!requester) {
      throw new NotFoundException(
        `Requester player with id: ${params['requester']} not found`,
      );
    }

    const challenged = await this.playerRepository.findOneBy({
      id: params['challenged:'],
    });

    if (!challenged) {
      throw new NotFoundException(
        `Challenged player with id: ${params['challenged']} not found`,
      );
    }

    const challenge = await this.challengesRepository.findOne({
      where: {
        id: params['challenge'],
      },
      relations: {
        challenged: true,
      },
    });

    if (!challenge) {
      throw new NotFoundException(
        `Challenge with id: ${params['challenge']} not found`,
      );
    }

    const requesterAllreadyChallenged = await this.challengesRepository.findOne(
      {
        where: {
          requester: {
            id: params['requester'],
            challenger: {
              id: params['challenge'],
            },
            challengers: {
              challenged: {
                id: params['challenged:'],
              },
            },
          },
        },
      },
    );

    if (requesterAllreadyChallenged) {
      throw new BadRequestException(
        `Requester ${requester.name} allready challenged ${challenged.name}`,
      );
    }

    challenge.challenged.push(challenged);

    await this.challengesRepository.save({ ...challenge, status: 'ACCEPTED' });

    const { id } = challenge;

    return this.challengesRepository.findOne({
      select: {
        id: true,
        status: true,
        category: true,
        requester: {
          id: true,
          name: true,
          email: true,
          cellphone: true,
        },
        challenged: {
          id: true,
          name: true,
          email: true,
          cellphone: true,
        },
      },
      where: { id },
      relations: ['requester', 'challenged'],
    });
  }

  findAll() {
    return `This action returns all challenges`;
  }

  findOne(id: number) {
    return `This action returns a #${id} challenge`;
  }

  update(id: number, updateChallengeDto: UpdateChallengeDto) {
    return `This action updates a #${id} challenge`;
  }

  remove(id: number) {
    return `This action removes a #${id} challenge`;
  }
}
