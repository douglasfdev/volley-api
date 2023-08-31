import { Test, TestingModule } from '@nestjs/testing';
import { VolleyballService } from './volleyball.service';

describe('VolleyballService', () => {
  let service: VolleyballService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VolleyballService],
    }).compile();

    service = module.get<VolleyballService>(VolleyballService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
