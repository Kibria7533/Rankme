import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AboutUsDto } from './aboutus.dto';
import { AboutusService } from './aboutus.service';

@ApiTags('About Us')
@Controller('api/v1/aboutus')
export class AboutusController {

    constructor(private aboutUsService : AboutusService){}

    @Get('')
    @ApiOperation({summary : 'get about us'})
    async getAboutUS() {
        return this.aboutUsService.getAboutUs();
    }

    @Post('')
    @ApiOperation({summary : 'create about us'})
    @UseGuards(JwtAuthGuard)
    async createAboutUs(
        @Body() data : AboutUsDto
    ){
        return this.aboutUsService.createAboutUs(data);
    }

    @Put('update')
    @ApiOperation({summary : 'update about us'})
    // @ApiParam({name : 'id' , description : 'id of about us to update'})
    @UseGuards(JwtAuthGuard)
    async updateAboutUs(
        // @Param() params,
        @Body() data : AboutUsDto
    ){
        return this.aboutUsService.updateAboutUs( data);
    }
}
