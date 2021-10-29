import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(async () => {
    let MockAdminService={}
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminService,{
        provide:AdminService,
        useValue:MockAdminService
      }],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
