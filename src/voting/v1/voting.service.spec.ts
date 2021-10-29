import { Test, TestingModule } from '@nestjs/testing';
import { VotingService } from '../voting.service';

describe('VotingService', () => {
  let service: VotingService;

  beforeEach(async () => {
    let MockVotingService={}
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotingService,{
        provide:VotingService,
        useValue:MockVotingService
      }],
    }).compile();

    service = module.get<VotingService>(VotingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
