import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CollegeModule } from "../college/v1/college.module";
import { VotingController } from "./v1/voting.controller";
import { Voting } from "./voting.entity";
import { VotingService } from "./voting.service";

@Module({
    controllers : [VotingController],
    providers : [VotingService],
    exports : [VotingService],
    imports : [TypeOrmModule.forFeature([Voting]),CollegeModule]
})

export class VotingModule{}