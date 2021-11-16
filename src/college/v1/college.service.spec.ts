import { Test, TestingModule } from '@nestjs/testing';
import { CollegeController } from './college.controller';
import { CollegeDto } from '../college.dto';
import { CollegeService } from './college.service';
import { RankService } from '../../rank/v1/rank.service';
import { College } from '../college.entity';
import {
  IPaginationOptions,
  paginate,
  paginateRaw,
  paginateRawAndEntities,
  Pagination,
} from 'nestjs-typeorm-paginate';
let b=true;

describe('CollegeService', () => {

  let service: CollegeService;

  beforeEach(async () => {

    let MockRankservice = {
      getById: (id: string, { }) => Promise.resolve({
        "city": "Commerce",
        "description": "Texas A&M University–Commerce is a public research university in Commerce, Texas. With an enrollment of over 12,000 students as of fall 2017, the university is the third-largest institution in the Texas A&M University System. Founded in 1889, the institution is also the fourth-oldest state university or college in the State of Texas.",
        "description_url": "https://en.wikipedia.org/wiki/Texas_A%26M_University%E2%80%93Commerce",
        "founded_date": null,
        "id": 883,
        "image": "http://localhost:4000/collegeImages/A&M Commerce.png",
        "image_author": "Texas A&M University-Commerce Marketing Communications Photography - ETSTC ,Heritage Garden-8270",
        "image_license": "CC BY 2.0",
        "image_title": "ETSTC Heritage Garden-8270 (17883809346)",
        "image_url": "https://commons.wikimedia.org/wiki/File:ETSTC_Heritage_Garden-8270_(17883809346).jpg",
        "name": "Texas A&M University-Commerce",
        "rating": "1",
        "state": "TX",
        "status": 1,
        "website": "https://www.tamuc.edu/"
      })
      ,
      getCollege: (query: string) => Promise.resolve({
        "city": "Commerce",
        "description": "Texas A&M University–Commerce is a public research university in Commerce, Texas. With an enrollment of over 12,000 students as of fall 2017, the university is the third-largest institution in the Texas A&M University System. Founded in 1889, the institution is also the fourth-oldest state university or college in the State of Texas.",
        "description_url": "https://en.wikipedia.org/wiki/Texas_A%26M_University%E2%80%93Commerce",
        "founded_date": null,
        "id": 883,
        "image": "http://localhost:4000/collegeImages/A&M Commerce.png",
        "image_author": "Texas A&M University-Commerce Marketing Communications Photography - ETSTC ,Heritage Garden-8270",
        "image_license": "CC BY 2.0",
        "image_title": "ETSTC Heritage Garden-8270 (17883809346)",
        "image_url": "https://commons.wikimedia.org/wiki/File:ETSTC_Heritage_Garden-8270_(17883809346).jpg",
        "name": "Texas A&M University-Commerce",
        "rating": 1,
        "state": "TX",
        "status": Boolean('true'),
        "website": "https://www.tamuc.edu/",
        created_at:'1',
        max_rating:12,
        rank:[],
        total_game:2,
        updated_at:'2',
        votings:[],
        ranks:[],
        ratings:[],
        rank_number:45
      }),
      createCollege:(entiy:CollegeDto)=>Promise.resolve({}),
      getColleges: (query: string) => Promise.resolve([
        {
          "city": "Commerce",
          "description": "Texas A&M University–Commerce is a public research university in Commerce, Texas. With an enrollment of over 12,000 students as of fall 2017, the university is the third-largest institution in the Texas A&M University System. Founded in 1889, the institution is also the fourth-oldest state university or college in the State of Texas.",
          "description_url": "https://en.wikipedia.org/wiki/Texas_A%26M_University%E2%80%93Commerce",
          "founded_date": null,
          "id": 883,
          "image": "http://localhost:4000/collegeImages/A&M Commerce.png",
          "image_author": "Texas A&M University-Commerce Marketing Communications Photography - ETSTC ,Heritage Garden-8270",
          "image_license": "CC BY 2.0",
          "image_title": "ETSTC Heritage Garden-8270 (17883809346)",
          "image_url": "https://commons.wikimedia.org/wiki/File:ETSTC_Heritage_Garden-8270_(17883809346).jpg",
          "name": "Texas A&M University-Commerce",
          "rating": "1",
          "state": "TX",
          "status": 1,
          "website": "https://www.tamuc.edu/"
        }
      ]),
      updateCollege:(id:string,data:Partial<CollegeDto>)=>Promise.resolve({
        "city": "Commerce",
        "description": "Texas A&M University–Commerce is a public research university in Commerce, Texas. With an enrollment of over 12,000 students as of fall 2017, the university is the third-largest institution in the Texas A&M University System. Founded in 1889, the institution is also the fourth-oldest state university or college in the State of Texas.",
        "description_url": "https://en.wikipedia.org/wiki/Texas_A%26M_University%E2%80%93Commerce",
        "founded_date": null,
        "id": 883,
        "image": "http://localhost:4000/collegeImages/A&M Commerce.png",
        "image_author": "Texas A&M University-Commerce Marketing Communications Photography - ETSTC ,Heritage Garden-8270",
        "image_license": "CC BY 2.0",
        "image_title": "ETSTC Heritage Garden-8270 (17883809346)",
        "image_url": "https://commons.wikimedia.org/wiki/File:ETSTC_Heritage_Garden-8270_(17883809346).jpg",
        "name": "Texas A&M University-Commerce",
        "rating": 1,
        "state": "TX",
        "status": Boolean('true'),
        "website": "https://www.tamuc.edu/",
        created_at:'1',
        max_rating:12,
        rank:[],
        total_game:2,
        updated_at:'2',
        votings:[],
        ranks:[],
        ratings:[],
        rank_number:45
      }),
      deleteCollege:(id:string)=>Promise.resolve({})
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollegeController],
      // If you've looked at the complex sample you'll notice that these functions
      // are a little bit more in depth using mock implementation
      // to give us a little bit more control and flexibility in our tests
      // this is not necessary, but can sometimes be helpful in a test scenario
      providers: [CollegeService, {
        provide: RankService,
        useValue: MockRankservice
      }],
    }).overrideProvider(CollegeService).useValue(MockRankservice).compile();

    //  controller = module.get<CollegeController>(CollegeController);
    service = module.get<CollegeService>(CollegeService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getById', () => {
    it('should get a college', async () => {
      await expect(service.getById(1, {})).resolves.toEqual(
        {
          "city": "Commerce",
          "description": "Texas A&M University–Commerce is a public research university in Commerce, Texas. With an enrollment of over 12,000 students as of fall 2017, the university is the third-largest institution in the Texas A&M University System. Founded in 1889, the institution is also the fourth-oldest state university or college in the State of Texas.",
          "description_url": "https://en.wikipedia.org/wiki/Texas_A%26M_University%E2%80%93Commerce",
          "founded_date": null,
          "id": 883,
          "image": "http://localhost:4000/collegeImages/A&M Commerce.png",
          "image_author": "Texas A&M University-Commerce Marketing Communications Photography - ETSTC ,Heritage Garden-8270",
          "image_license": "CC BY 2.0",
          "image_title": "ETSTC Heritage Garden-8270 (17883809346)",
          "image_url": "https://commons.wikimedia.org/wiki/File:ETSTC_Heritage_Garden-8270_(17883809346).jpg",
          "name": "Texas A&M University-Commerce",
          "rating": "1",
          "state": "TX",
          "status": 1,
          "website": "https://www.tamuc.edu/"
        }
      );
    });
  });

  describe('getCollege', () => {
    it('should get a college', async () => {
      await expect(service.getCollege('1')).resolves.toEqual({
        "city": "Commerce",
        "description": "Texas A&M University–Commerce is a public research university in Commerce, Texas. With an enrollment of over 12,000 students as of fall 2017, the university is the third-largest institution in the Texas A&M University System. Founded in 1889, the institution is also the fourth-oldest state university or college in the State of Texas.",
        "description_url": "https://en.wikipedia.org/wiki/Texas_A%26M_University%E2%80%93Commerce",
        "founded_date": null,
        "id": 883,
        "image": "http://localhost:4000/collegeImages/A&M Commerce.png",
        "image_author": "Texas A&M University-Commerce Marketing Communications Photography - ETSTC ,Heritage Garden-8270",
        "image_license": "CC BY 2.0",
        "image_title": "ETSTC Heritage Garden-8270 (17883809346)",
        "image_url": "https://commons.wikimedia.org/wiki/File:ETSTC_Heritage_Garden-8270_(17883809346).jpg",
        "name": "Texas A&M University-Commerce",
        "rating": 1,
        "state": "TX",
        "status": Boolean('true'),
        "website": "https://www.tamuc.edu/",
        created_at:'1',
        max_rating:12,
        rank:[],
        total_game:2,
        updated_at:'2',
        votings:[],
        ranks:[],
        ratings:[],
        rank_number:45
      });
    });
  });
 
  describe('createCollege', () => {
    it('should save a college', async () => {
      return await expect(service.createCollege({
        "city": "Commerce",
        "description": "Texas A&M University–Commerce is a public research university in Commerce, Texas. With an enrollment of over 12,000 students as of fall 2017, the university is the third-largest institution in the Texas A&M University System. Founded in 1889, the institution is also the fourth-oldest state university or college in the State of Texas.",
        "description_url": "https://en.wikipedia.org/wiki/Texas_A%26M_University%E2%80%93Commerce",
        "founded_date": null,
        "id": 883,
        "image": "http://localhost:4000/collegeImages/A&M Commerce.png",
        "image_author": "Texas A&M University-Commerce Marketing Communications Photography - ETSTC ,Heritage Garden-8270",
        "image_license": "CC BY 2.0",
        "image_title": "ETSTC Heritage Garden-8270 (17883809346)",
        "image_url": "https://commons.wikimedia.org/wiki/File:ETSTC_Heritage_Garden-8270_(17883809346).jpg",
        "name": "Texas A&M University-Commerce",
        "rating": 1,
        "state": "TX",
        "status": Boolean('true'),
        "website": "https://www.tamuc.edu/",
        created_at:'1',
        max_rating:12,
        rank:[],
        total_game:2,
        updated_at:'2',
        votings:[],
        ranks:[],
        ratings:[],
        rank_number:45
      })).resolves.toEqual({});
    });
  });


  describe('getColleges', () => {
    it('should get array college', async () => {
      await expect(service.getColleges({limit:10,page:34}, {})).resolves.toEqual([
        {
          "city": "Commerce",
          "description": "Texas A&M University–Commerce is a public research university in Commerce, Texas. With an enrollment of over 12,000 students as of fall 2017, the university is the third-largest institution in the Texas A&M University System. Founded in 1889, the institution is also the fourth-oldest state university or college in the State of Texas.",
          "description_url": "https://en.wikipedia.org/wiki/Texas_A%26M_University%E2%80%93Commerce",
          "founded_date": null,
          "id": 883,
          "image": "http://localhost:4000/collegeImages/A&M Commerce.png",
          "image_author": "Texas A&M University-Commerce Marketing Communications Photography - ETSTC ,Heritage Garden-8270",
          "image_license": "CC BY 2.0",
          "image_title": "ETSTC Heritage Garden-8270 (17883809346)",
          "image_url": "https://commons.wikimedia.org/wiki/File:ETSTC_Heritage_Garden-8270_(17883809346).jpg",
          "name": "Texas A&M University-Commerce",
          "rating": "1",
          "state": "TX",
          "status": 1,
          "website": "https://www.tamuc.edu/"
        }]
      );
    });
  });



  describe('updateCollege', () => {
    it('should update a college', async () => {
      await expect(service.updateCollege('1',{})).resolves.toEqual({
        "city": "Commerce",
        "description": "Texas A&M University–Commerce is a public research university in Commerce, Texas. With an enrollment of over 12,000 students as of fall 2017, the university is the third-largest institution in the Texas A&M University System. Founded in 1889, the institution is also the fourth-oldest state university or college in the State of Texas.",
        "description_url": "https://en.wikipedia.org/wiki/Texas_A%26M_University%E2%80%93Commerce",
        "founded_date": null,
        "id": 883,
        "image": "http://localhost:4000/collegeImages/A&M Commerce.png",
        "image_author": "Texas A&M University-Commerce Marketing Communications Photography - ETSTC ,Heritage Garden-8270",
        "image_license": "CC BY 2.0",
        "image_title": "ETSTC Heritage Garden-8270 (17883809346)",
        "image_url": "https://commons.wikimedia.org/wiki/File:ETSTC_Heritage_Garden-8270_(17883809346).jpg",
        "name": "Texas A&M University-Commerce",
        "rating": 1,
        "state": "TX",
        "status": Boolean('true'),
        "website": "https://www.tamuc.edu/",
        created_at:'1',
        max_rating:12,
        rank:[],
        total_game:2,
        updated_at:'2',
        votings:[],
        ranks:[],
        ratings:[],
        rank_number:45
      });
    });
  });

  describe('deleteCollege', () => {
    it('should delete a college', async () => {
      await expect(service.deleteCollege('1')).resolves.toEqual({});
    });
  });

});
