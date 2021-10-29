import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from '../../utils/file-uploading.utils';
import { CollegeDto } from '../college.dto';
import { CollegeService } from './college.service';
import { diskStorage } from 'multer';
import { Express } from 'express';
import { ApiNotFoundResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RankService } from '../../rank/v1/rank.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { plainToClass } from 'class-transformer';
@ApiTags('College')
@Controller('api/v1/colleges')
export class CollegeController {
  constructor(private collegeService: CollegeService , private rankService: RankService) {}

 //get college by id
  @Get(':id/id')
  @ApiOperation({ summary : 'get college by id'})
  @ApiNotFoundResponse({ status: 404,  description: 'The request college is not found!'})
  @ApiQuery({ name: 'duration' , required: false , description: 'duration of rank list' })
  @ApiQuery({name : 'time_span', required: false , description: 'time span of rank list'})
  @ApiParam({ name: 'id' , description: 'id of college to request'})
  @UseInterceptors(ClassSerializerInterceptor)
  getCollegeById(
    @Param() params,
    @Query('duration') duration = 7,
    @Query('time_span') time_span = 'D'
    ) : Promise<CollegeDto> {
      const query = {
        'duration' : duration,
        'time_span' : time_span
      }
      let college=this.collegeService.getById(params.id , query);

    return college;
  }

   //get ranks by college id
  @Get(':id/ranks')
  @ApiOperation({ summary : 'get college ranks by id'})
  @ApiNotFoundResponse({ status: 404,  description: 'The request college is not found!'})
  @ApiQuery({ name: 'duration' , required: false , description: 'duration of rank list' })
  @ApiQuery({name : 'time_span', required: false , description: 'time span of rank list'})
  @ApiParam({ name: 'id' , description: 'id of college to request'})
  getCollegeRanksById(
    @Param() params,
    @Query('duration') duration = 7,
    @Query('time_span') time_span = 'D'
    )  {
      const query = {
        'duration' : duration,
        'time_span' : time_span
      }
    return this.collegeService.getRanksById(params.id , query);
  }

  //get all acitve colleges
  @Get()
  @ApiOperation({ summary: 'List all colleges with pagination' })
  // @UseInterceptors(ClassSerializerInterceptor)
  @ApiQuery({ name: 'page' , description: 'page number to request' })
  @ApiQuery({name : 'limit', description: 'number of item per page'})
  @ApiQuery({name : 'search_term' , required:false, description: 'search keyword'})
   async getAllColleges(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search_term') search_term
  ) {
    const options = {
      'page' : page,
      'limit' : limit,
      'route' : process.env.APP_URL + '/api/v1/colleges',
    }

    const query = {
      'search_term' : search_term
    }

    const colleges = await  this.collegeService.getColleges(options ,query);
   

    return colleges;
  }

  //create new college
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary : 'Create college'})
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files/collegeImages',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  createCollege(@Body() college: CollegeDto, @UploadedFile() image : Express.Multer.File) {
  
    if (image) {
      college.image = image.filename;
    }

    return this.collegeService.createCollege(college);
  }

  //update existing college
  @Put(':id/update')
  @ApiOperation({summary : 'update college'})
  @ApiParam({ name: 'id' , description: 'id of college to update'})
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files/collegeImages',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  updateCollege(
    @Param() params,
    @Body() college: CollegeDto,
    @UploadedFile() image,
  ) {
    if (image) college.image = image.filename;
    return this.collegeService.updateCollege(params.id, college);
  }

  //delete college by id
  @Delete(':id/delete')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary : 'Delete college'})
  @ApiParam({ name: 'id' , description: 'id of college to delete'})
  deleteCollege(@Param() params) {
    return this.collegeService.deleteCollege(params.id);
  }

}
