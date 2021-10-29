import { Test, TestingModule } from '@nestjs/testing';
import { AboutusService } from './aboutus.service';

describe('AboutusService', () => {
  let service: AboutusService;
let MockAboutUsService={}
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AboutusService,{
        provide:AboutusService,
        useValue:MockAboutUsService
      }],
    }).compile();

    service = module.get<AboutusService>(AboutusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
