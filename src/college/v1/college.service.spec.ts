import { Test, TestingModule } from '@nestjs/testing';
import { CollegeController } from './college.controller';
import { CollegeDto } from '../college.dto';
import { CollegeService } from './college.service';
import { RankService } from '../../rank/v1/rank.service';



describe('CollegeService', () => {

  let service: CollegeService;

  beforeEach(async () => {

    let MockRankservice={
      getById:(id:string,{})=>Promise.resolve({
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
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollegeController],
      // If you've looked at the complex sample you'll notice that these functions
      // are a little bit more in depth using mock implementation
      // to give us a little bit more control and flexibility in our tests
      // this is not necessary, but can sometimes be helpful in a test scenario
      providers: [CollegeService,{
        provide:RankService,
        useValue:MockRankservice
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
      await expect(service.getById(1,{})).resolves.toEqual(
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
//   describe('getById', () => {
//     it('should get a single cat', async () => {
//       await expect(controller.getById('a strange id')).resolves.toEqual({
//         name: testCat1,
//         breed: testBreed1,
//         age: 4,
//         id: 'a strange id',
//       });
//       await expect(controller.getById('a different id')).resolves.toEqual({
//         name: testCat1,
//         breed: testBreed1,
//         age: 4,
//         id: 'a different id',
//       });
//     });
//   });
//   describe('getByName', () => {
//     it('should get a cat back', async () => {
//       await expect(controller.getByName('Ventus')).resolves.toEqual({
//         name: 'Ventus',
//         breed: testBreed1,
//         age: 4,
//       });
//       const getByNameSpy = jest
//         .spyOn(service, 'getOneByName')
//         .mockResolvedValueOnce({
//           name: 'Aqua',
//           breed: 'Maine Coon',
//           age: 5,
//           id: 'a new uuid',
//         });
//       await expect(controller.getByName('Aqua')).resolves.toEqual({
//         name: 'Aqua',
//         breed: 'Maine Coon',
//         age: 5,
//         id: 'a new uuid',
//       });
//       expect(getByNameSpy).toBeCalledWith('Aqua');
//     });
//   });
//   describe('newCat', () => {
//     it('should create a new cat', async () => {
//       const newCollegeDto: CollegeDto = {
//         name: 'New Cat 1',
//         breed: 'New Breed 1',
//         age: 4,
//       };
//       await expect(controller.newCat(newCollegeDto)).resolves.toEqual({
//         id: 'a uuid',
//         ...newCollegeDto,
//       });
//     });
//   });
//   describe('updateCat', () => {
//     it('should update a new cat', async () => {
//       const newCollegeDto: CollegeDto = {
//         name: 'New Cat 1',
//         breed: 'New Breed 1',
//         age: 4,
//       };
//       await expect(controller.updateCat(newCollegeDto)).resolves.toEqual({
//         id: 'a uuid',
//         ...newCollegeDto,
//       });
//     });
//   });
//   describe('deleteCat', () => {
//     it('should return that it deleted a cat', async () => {
//       await expect(controller.deleteCat('a uuid that exists')).resolves.toEqual(
//         {
//           deleted: true,
//         },
//       );
//     });
//     it('should return that it did not delete a cat', async () => {
//       const deleteSpy = jest
//         .spyOn(service, 'deleteOne')
//         .mockResolvedValueOnce({ deleted: false });
//       await expect(
//         controller.deleteCat('a uuid that does not exist'),
//       ).resolves.toEqual({ deleted: false });
//       expect(deleteSpy).toBeCalledWith('a uuid that does not exist');
//     });
//   });
 });
