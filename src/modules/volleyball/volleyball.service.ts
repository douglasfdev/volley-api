import { Injectable } from '@nestjs/common';
import { CreateVolleyballDto } from './dto/create-volleyball.dto';
import { UpdateVolleyballDto } from './dto/update-volleyball.dto';

@Injectable()
export class VolleyballService {
  create(createVolleyballDto: CreateVolleyballDto) {
    return 'This action adds a new volleyball';
  }

  findAll() {
    return `This action returns all volleyball`;
  }

  findOne(id: number) {
    return `This action returns a #${id} volleyball`;
  }

  update(id: number, updateVolleyballDto: UpdateVolleyballDto) {
    return `This action updates a #${id} volleyball`;
  }

  remove(id: number) {
    return `This action removes a #${id} volleyball`;
  }
}
