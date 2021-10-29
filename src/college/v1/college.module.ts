import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankModule } from '../../rank/v1/rank.module';
import { College } from '../college.entity';
import { CollegeController } from './college.controller';
import { CollegeService } from './college.service';
import { CollegeImageController } from './image.controller';

@Module({
  controllers: [CollegeController, CollegeImageController],
  providers: [CollegeService],
  exports: [CollegeService],
  imports: [TypeOrmModule.forFeature([College]) , RankModule],
})
export class CollegeModule {}
