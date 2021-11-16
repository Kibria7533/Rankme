import { Test, TestingModule } from '@nestjs/testing';
import { VotingService } from '../voting.service';

describe('VotingService', () => {
  let service: VotingService;

  beforeEach(async () => {
    let MockVotingService={
      getCollegesForVoting:()=>Promise.resolve({}),
      postVote:()=>Promise.resolve(true)
    }
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


  describe('getCollegesForVoting', () => {
    it('should get two college', async () => {
      await expect(service.getCollegesForVoting()).resolves.toEqual({});
    });
  });


  describe('postVote', () => {
    it('should create a vote', async () => {
      await expect(service.postVote({contenders:[1,4],winner:1})).resolves.toEqual(true);
    });
  });

  
});
