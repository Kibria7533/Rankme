import { Module } from '@nestjs/common';
import { RankRecordService } from './rankrecord.service';

@Module({
  providers: [RankRecordService],
})
export class TasksModule {}