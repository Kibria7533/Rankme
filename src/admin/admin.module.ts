import { forwardRef, Inject, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { AdminController } from './v1/admin.controller';

@Module({
  controllers : [AdminController],
  providers: [AdminService,AuthService],
  exports : [AdminService],
  imports: [TypeOrmModule.forFeature([Admin]) , forwardRef(() => AuthModule) ,JwtService],
})

export class AdminModule {}
