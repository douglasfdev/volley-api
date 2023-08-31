import { Test, TestingModule } from '@nestjs/testing';
import { VolleyballController } from './volleyball.controller';
import { VolleyballService } from './volleyball.service';

describe('VolleyballController', () => {
  let controller: VolleyballController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VolleyballController],
      providers: [VolleyballService],
    }).compile();

    controller = module.get<VolleyballController>(VolleyballController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
