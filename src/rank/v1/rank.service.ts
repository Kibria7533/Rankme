import { Injectable } from "@nestjs/common";
import * as moment from 'moment';
import { getManager } from "typeorm";

@Injectable()
export class RankService{

    async getRanksByCollege(collegeId , query){
        rank = [];
        var date = new Date();
        if(query.time_span == 'D'){
            date.setDate(date.getDate() - query.duration);
            var fromDate = date.toLocaleDateString('en-GB');
            var fromDate = (moment(fromDate , 'DD/MM/YYYY' )).format('YYYY-MM-DD');
            var rank = await getManager()
            .query('select created_at, `rank` from `rank` where collegeId = ' + collegeId + ' and created_at >= "'+fromDate+' 00:00:00"  group by DAY(created_at)');
          }
          
          if(query.time_span == 'M'){
            date.setDate(date.getMonth() - query.duration);
            var fromDate = date.toLocaleDateString('en-GB');
            var fromDate = (moment(fromDate, 'DD/MM/YYYY')).format('YYYY-MM-DD');
            var rank = await getManager()
                            .query('select created_at, MAX(`rank`) as `r`  from `rank` where collegeId = ' + collegeId + ' and created_at >= "'+fromDate+' 00:00:00" GROUP BY MONTH(created_at)');
                          }

          if(query.time_span == 'Y'){
            date.setDate(date.getFullYear() - query.duration);
            var fromDate = date.toLocaleDateString('en-GB');
            var fromDate = (moment(fromDate, 'DD/MM/YYYY')).format('YYYY-MM-DD');
            var rank = await getManager()
                            .query('select created_at, MAX(`rank`) as `r` from `rank` where collegeId = ' + collegeId + ' and created_at >= "'+fromDate+' 00:00:00" GROUP BY YEAR(created_at)');
                          }
 
        return rank;
    }

    async getRatingsByCollege(collegeId , query){
      rank = [];
      var date = new Date();
      
      if(query.time_span == 'D'){
          date.setDate(date.getDate() - query.duration);
          var fromDate = date.toLocaleDateString('en-GB');
          var fromDate = (moment(fromDate , 'DD/MM/YYYY' )).format('YYYY-MM-DD');
          var rank = await getManager()
          .query('select created_at, `rating` from `rank` where collegeId = ' + collegeId + ' and created_at >= "'+fromDate+' 00:00:00"');
        }
        
        if(query.time_span == 'M'){
          date.setDate(date.getMonth() - query.duration);
          var fromDate = date.toLocaleDateString('en-GB');
          var fromDate = (moment(fromDate , 'DD/MM/YYYY' )).format('YYYY-MM-DD');
          var rank = await getManager()
                          .query('select created_at, MAX(`rating`) as `r`  from `rank` where collegeId = ' + collegeId + ' and created_at >= "'+fromDate+' 00:00:00" GROUP BY MONTH(created_at)');
                        }

        if(query.time_span == 'Y'){
          date.setDate(date.getFullYear() - query.duration);
          var fromDate = date.toLocaleDateString('en-GB');
          var fromDate = (moment(fromDate , 'DD/MM/YYYY' )).format('YYYY-MM-DD');
          var rank = await getManager()
                          .query('select created_at, MAX(`rating`) as `r` from `rank` where collegeId = ' + collegeId + ' and created_at >= "'+fromDate+' 00:00:00" GROUP BY YEAR(created_at)');
                        }

      return rank;
  }
}
