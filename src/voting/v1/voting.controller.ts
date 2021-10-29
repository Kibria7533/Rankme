import { Body, ClassSerializerInterceptor, Controller, Get, HttpStatus, Post, Res, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CollegeDto } from "../../college/college.dto";
import { VotingPostDto } from "../../college/voting.dto";
import { VotingService } from "../voting.service";
import  { Response} from 'express';

@ApiTags('Voting')
@Controller('api/v1')
export class VotingController{

  constructor(private votingService : VotingService){}
     //get 2 college for voting
  @Get('colleges/voting')
  // @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({summary : 'Get two college for voting'})
  getCollegeForVoting() 
  : Promise<CollegeDto[]>
   {
    return this.votingService.getCollegesForVoting();
 
  }


  //post voting
  @Post('colleges/voting')
  @ApiOperation({summary : 'Post Votes college'})
  postVote(@Body() votingPostDto : VotingPostDto , @Res() response: Response){
    if(votingPostDto.contenders.length != 2) {
      response.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
        statusCode : 422,
        error : 'contenders length should be exact 2'
    });
    } 
    const status =  this.votingService.postVote(votingPostDto);
  
    if (status) {
      response.status(HttpStatus.OK).send({
        statusCode : 200,
        message : 'Voting successfully posted'
      });
    }else{
      response.status(HttpStatus.NOT_MODIFIED).send({
        statusCode : 500,
        error : 'sorry could not register vote, Try again later'
    });
    }
  
  }


}