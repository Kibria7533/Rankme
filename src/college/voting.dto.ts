import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty } from "class-validator";

export class VotingPostDto {
    @ApiProperty({ type: [Number , Number] })
    @IsNotEmpty()
    @IsArray()
    contenders : [ number , number ];

    @ApiProperty()
    @IsNotEmpty()
    winner : number

}
