import { UpdateChallengeDto } from './../dto/update-challenge.dto';
import { CreateChallengeDto } from './../dto/create-challenge.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChallengesService {
  create(createChallengeDto: CreateChallengeDto) {
    return 'This action adds a new challenge';
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
