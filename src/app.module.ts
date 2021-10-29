import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollegeModule } from './college/v1/college.module';
import { RankRecordService } from './tasks/rankrecord/rankrecord.service';
import { MailModule } from './mail/mail.module';
import { ContactModule } from './contact/contact.module';
import { VotingModule } from './voting/voting.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { AboutusModule } from './aboutus/aboutus.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    CollegeModule,
    TypeOrmModule.forRoot(),
    MulterModule.register({ dest: './files' }),
    ScheduleModule.forRoot(),
    RankRecordService,
    MailModule,
    ContactModule,
    VotingModule,
    AuthModule,
    AdminModule,
    AboutusModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/files'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
