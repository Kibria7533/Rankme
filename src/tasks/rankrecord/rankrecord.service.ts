
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';
import { getManager } from 'typeorm';

@Injectable()
export class RankRecordService {
  private readonly logger = new Logger(RankRecordService.name);
 
  @Cron(CronExpression.EVERY_10_MINUTES, {
    name: 'rank record for the day',
    timeZone: 'Asia/Kathmandu',
  })
  async handleCron() {
    console.log('its called')
    try{
      await getManager().query('insert into `rank` (`rank` ,`rating`, updated_at , created_at ,collegeId) SELECT ROW_NUMBER() OVER (ORDER BY rating DESC) AS `rank`, `rating` , NOW() , NOW(), id from college');
    }
    catch(err){
      console.log('err',err)
    }
   
    this.logger.debug('record of rank saved');
  }

}