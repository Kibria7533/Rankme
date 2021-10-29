import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getManager, QueryBuilder } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  paginateRaw,
  paginateRawAndEntities,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { College } from '../college.entity';
import { RankService } from '../../rank/v1/rank.service';
import { CollegeDto } from '../college.dto';
import { plainToClass, serialize } from 'class-transformer';

@Injectable()
export class CollegeService {
 
  constructor(
    @InjectRepository(College) private collegeRepo: Repository<College>,
    private readonly rankService: RankService
  ) {}

  async getById(id , query) : Promise<CollegeDto> {
    // console.log('college kujchi',id)
    const colleges = await this.collegeRepo.findOne(id);

    var rank = await this.rankService.getRanksByCollege(colleges.id , query);
    colleges.rank = rank.map(Object.values);

    var ratings = await this.rankService.getRatingsByCollege(colleges.id, query);
    colleges.ratings = ratings.map(Object.values);
    
    // console.log(colleges,'colleges here in college service')
    // return plainToClass( CollegeDto , colleges);
    return colleges;
  }


  async getRanksById(id , query){
    const colleges = await getManager()
    .query('Select * from college where id = ' + id + '');
    if (colleges.length === 0 ) throw new NotFoundException();
    
    var ranks = await  this.rankService.getRanksByCollege(id , query);


    return ranks.map(Object.values)
  
  }

  async getCollege(query) : Promise<College[]>{
       const queryBuilder = this.collegeRepo.createQueryBuilder('q');
                                           

      return queryBuilder.getMany();
  }

  async getColleges(options: IPaginationOptions, query) {

    const offset = (Number(options.limit) * Number(options.page)) - Number(options.limit);
    
    var select_query = 'SELECT * ,ROW_NUMBER () OVER (ORDER BY rating DESC) AS rank_number FROM college where status = 1';
    if(query.search_term !== undefined)
    select_query = select_query +  ' and name like "%'+query.search_term+'%"';
    select_query = select_query + ' ORDER BY rating DESC LIMIT ' +  options.limit + ' OFFSET ' + offset;
  

    const total_count = await getManager().query('SELECT COUNT(*) as total_item FROM college where status = 1 ');
    const total_item = Number(total_count[0].total_item);
    const total_pages = Math.ceil(Number(total_item)/Number(options.limit));
    const item = await getManager().query(select_query)
    .then(async res => {
        const q = {
            'time_span' : 'D',
            'duration' : 7
        }
       

        for(let x of res){
          var rank = await this.rankService.getRanksByCollege(x.id , q);
          rank = rank.map(Object.values);
          rank.unshift(['Date' , 'Rank']);
          x.rank = rank;
  
          var ratings = await this.rankService.getRatingsByCollege(x.id, q);
          ratings = ratings.map(Object.values);
          ratings.unshift(['Date' , 'Elo Rating']);
          x.ratings = ratings;

          //  x.image = process.env.APP_URL + '/files/collegeImages/' + x.image;
        }
  
        return res;
        });

    
    const items = plainToClass(CollegeDto, item);

    const meta = {
      "totalItems": total_item,
      "itemCount": options.limit,
      "itemsPerPage": options.limit,
      "totalPages": total_pages,
      "currentPage": options.page     
    };

    // const links = {
    //   "first": process.env.APP_URL+"/api/v1/colleges?limit="+options.limit,
    //   "previous": process.env.APP_URL+"/api/v1/colleges?limit="+options.limit+"&page="+options.page + 1,
    //   "next": "http://localhost:7000/api/v1/colleges?page=2&limit=10",
    //   "last": "http://localhost:7000/api/v1/colleges?page=3&limit=10"
    //   }

      var colleges = {
        'items' : items,
        'meta' : meta,
        // 'links' : links
      }

      return colleges;
  

      // const meta = 
      //   "totalItems": number,
      //   "itemCount": number,
      //   "itemsPerPage": number,
      //   "totalPages": number,
      //   "currentPage": number
      // };

      // meta.totalItems = Number(23),
      // meta.itemCount = 10,
      // meta.itemsPerPage = 10,
      // meta.totalPages = 3,
      // meta.currentPage = 1    

      // var colleges = {'items' : Array , 'meta' : Object , 'links' : Object};
      // colleges.items = items;
      // colleges.meta = meta;
    // return paginateRaw(items , options);
    // const queryBuilder = this.collegeRepo.createQueryBuilder('q')
    //                                     .where('q.status = true')
    //                                     .addSelect('ROW_NUMBER () OVER (ORDER BY "rating" DESC)',  'row_number')
    //                                     .orderBy('q.rating')
    //                                     .getMany();
    
    // if(query.search_term !== undefined)
    //   queryBuilder.where('q.name LIKE "%'+ query.search_term +'%"');
   
    // return queryBuilder;
    // const [pagination, rawResults] = await paginateRawAndEntities(queryBuilder, options);
    // // 
    // pagination.items.map((item, index) => {
    //   console.log(rawResults);
    //   // console.log(rawResults);
    //   // console.log(rawResults.filter(v => v.q_id === 1));
    //     // item.row_number = rawResults.find(x => x.id == item.id).row_number;
    // },rawResults);

    // return pagination;
    

  }

  async createCollege(college: College) {
    return await this.collegeRepo.save(college);
  }

  async updateCollege(id, data) {
    await this.collegeRepo
      .update({ id }, { ...data })
      .then((r) => {
        console.log('success', r);
      })
      .catch((err) => {
        console.log('error', err.message);
      });

    const college =  await this.collegeRepo.findOne({ id });
    return plainToClass(CollegeDto , college);
  }

  async deleteCollege(id) {
    const college = await this.collegeRepo.findOne({ id });

    if (!college ) throw new NotFoundException();

    this.collegeRepo.delete(college.id );
    
    return {
      status : true,
      message : 'college deleted successfully'
    } ;
  }


}
