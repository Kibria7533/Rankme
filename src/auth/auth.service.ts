import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import {compare} from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
      private adminService : AdminService,
      private jwtService : JwtService
      ){}


    async validateAdmin(username: string, pass: string): Promise<any> {
        const admin = await this.adminService.getByUsername(username);
        if (admin && await compare(pass, admin.password)) {
          const { password, ...result } = admin;
          return result;
        }
        return null;
      }


    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
          access_token: this.jwtService.sign(payload),
          refresh_token : this.jwtService.sign(payload , {expiresIn : '1440m'})
        };
      }

    async verifyRefreshToken(refreshToken : string) : Promise<Boolean>{
      try{
        const h = await this.jwtService.verifyAsync(refreshToken);
        const expiry_date = new Date(h.exp * 1000); 
        if(expiry_date < new Date()){
          return false;
        }
        return true;
      }catch(err){
        return false;
      }
    }

    async getPayload(token : string) :Promise<any> {
      return  this.jwtService.decode(token);
    }
}
