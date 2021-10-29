import { Module } from "@nestjs/common";
import { RankService } from "./rank.service";

@Module({
    exports : [RankService],
    providers : [RankService]
})

export class RankModule {};