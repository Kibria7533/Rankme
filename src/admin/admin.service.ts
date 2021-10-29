import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { hash } from 'bcrypt'
import { plainToClass } from 'class-transformer';
import { AdminCreateDto } from './dto/adminCreate.dto';
import { AdminDto } from './dto/admin.dto';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin) private adminRepo : Repository<Admin>
    ){}


    async getById(id : number) : Promise<Admin>{
        return await this.adminRepo.findOne(id);
    }

    async getByUsername(username : string) : Promise<Admin>{
        return await this.adminRepo.findOne({username : username});
    }

    async storeAdmin(admin : AdminCreateDto){
        admin.password = await hash(admin.password, 10);
    
        return plainToClass(AdminDto , await this.adminRepo.save(admin));
    }

    async updateAdmin(id, admin ) {
        admin.password = await hash(admin.password, 10);
        await this.adminRepo
          .update({ id }, { ...admin })
          .then((r) => {
            console.log('success', r);
          })
          .catch((err) => {
            console.log('error', err.message);
          });
    
        const ad =  await this.adminRepo.findOne({ id });
        return ad;
        // return plainToClass(AdminDto , ad);
      }
}
