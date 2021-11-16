import { Test, TestingModule } from '@nestjs/testing';
import { RankService } from './rank.service';

describe('RankService', () => {
  
  let service: RankService;

  beforeEach(async () => {
    let MockRankService={
      getRanksByCollege:()=>Promise.resolve({}),
      getRatingsByCollege:()=>Promise.resolve({})
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [RankService,{
        provide:RankService,
        useValue:MockRankService
      }],
    }).compile();

    service = module.get<RankService>(RankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('getRanksByCollege', () => {
    it('should get a college', async () => {
      await expect(service.getRanksByCollege('1',{})).resolves.toEqual({});
    });
  });


  describe('getRatingsByCollege', () => {
    it('should get a college', async () => {
      await expect(service.getRatingsByCollege('1',{})).resolves.toEqual({});
    });
  });

});
