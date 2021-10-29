import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class MessageToAdminDto{
    @Expose()
    @ApiProperty()
    name : string;

    @Expose()
    @ApiProperty()
    email : string;

    @Expose()
    @ApiProperty()
    message : string;
}