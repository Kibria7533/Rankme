import { Test, TestingModule } from '@nestjs/testing';
import { RankRecordService } from '../rankrecord/rankrecord.service';

describe('RankRecordService', () => {
  let service: RankRecordService;

  beforeEach(async () => {
    let MockRankRecord={}
    const module: TestingModule = await Test.createTestingModule({
      providers: [RankRecordService,{
        provide:RankRecordService,
        useValue:MockRankRecord
      }],
    }).compile();

    service = module.get<RankRecordService>(RankRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
