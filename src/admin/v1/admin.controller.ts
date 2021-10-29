import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Put, Req, UnauthorizedException, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";
import { AuthService } from "src/auth/auth.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { LocalAuthGuard } from "src/auth/local-auth.guard";
import { AdminService } from "../admin.service";
import { AdminDto } from "../dto/admin.dto";
import { AdminCreateDto } from "../dto/adminCreate.dto";
import { LoginRequestDto, LoginResponseDto, RefreshRequestDto } from "../dto/login.dto";


@ApiTags('Admin')
@Controller('api/v1/admin')
export class AdminController{

    constructor(
        private adminService : AdminService,
        private readonly authService : AuthService
        ){}

    @Post()
    @ApiOperation({summary : 'Create Admin'})
    @UseInterceptors(ClassSerializerInterceptor)
    @UseInterceptors()
    @UseGuards(JwtAuthGuard)
    createAdmin(@Body() admin: AdminCreateDto){
        return this.adminService.storeAdmin(admin);
    }


    // @Put(':id/update')
    // // @ApiOperation({summary : 'update Admin'})
    // // @ApiParam({ name: 'id' , description: 'id of college to update'})
    // @UseGuards(JwtAuthGuard)
    // updateCollege(
    //     @Param() params,
    //     @Body() admin: AdminDto,
    // ) {
    //     return this.adminService.updateAdmin(params.id, admin);
    // }

    @Post('login')
    @ApiOperation({summary : 'Login Admin'})
    @UseGuards(LocalAuthGuard)
    async login(@Body() req : LoginRequestDto) : Promise<LoginResponseDto>{
        const admin = await this.adminService.getByUsername(req.username);
        admin.user_type = 'admin';
        const tokens = await this.authService.login({'username' : req.username , 'userId' : admin.id});
        return {
            'access_token' : tokens.access_token,
            'refresh_token' : tokens.refresh_token,
            'login_user' : plainToClass(AdminDto , admin)
        }
    }

    @Post('token/refresh')
    @ApiOperation({summary : 'Get new token by refresh token'})
    async refreshToken(
        @Body() body : RefreshRequestDto
    ){
        const verify = await this.authService.verifyRefreshToken(body.refresh_token);

        if(verify){
            const payload = await this.authService.getPayload(body.refresh_token);
         
            const admin = await this.adminService.getByUsername(payload.username);
     
            if(!admin) return new UnauthorizedException();
            const login = this.authService.login(admin);
            return login;
        }

        throw new UnauthorizedException();
    }

    // @Get('logout')
    // @UseGuards(JwtAuthGuard)
    // async logout(){
    //     return true;
    // }

    

}