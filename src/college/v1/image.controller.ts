import { Controller, Get, Param, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Images')
@Controller('files/collegeImages') 

export class CollegeImageController {
@Get(':fileId')
async serveCollegeImage(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: '../files/collegeImages'});
  }
}