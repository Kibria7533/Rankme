import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { AboutUsDto } from './aboutus.dto';
import { AboutUs } from './aboutus.entity';

@Injectable()
export class AboutusService {
    constructor(
        @InjectRepository(AboutUs) private aboutUsRepo : Repository<AboutUs>
    ){}

    async createAboutUs( data  : AboutUsDto){
        return this.aboutUsRepo.save(data);
    }

    async updateAboutUs( data : AboutUsDto){
        const toupdate = await this.aboutUsRepo.find();
        const id = toupdate[0].id;
        await this.aboutUsRepo
          .update({ id }, { ...data })
          .then((r) => {
            console.log('success', r);
          })
          .catch((err) => {
            console.log('error', err.message);
          });
    
        const aboutus =  await this.aboutUsRepo.findOne({ id });
        return plainToClass(AboutUsDto , aboutus);
    }

    async getAboutUs(){
       const aboutus = await this.aboutUsRepo.find();
       console.log(aboutus);
       return plainToClass( AboutUsDto, aboutus[0]);
    }
}
