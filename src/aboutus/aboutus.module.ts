import { Module } from '@nestjs/common';
import { AboutusService } from './aboutus.service';
import { AboutusController } from './aboutus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutUs } from './aboutus.entity';

@Module({
  providers: [AboutusService],
  controllers: [AboutusController],
  exports : [AboutusService],
  imports : [TypeOrmModule.forFeature([AboutUs])]
})
export class AboutusModule {}
