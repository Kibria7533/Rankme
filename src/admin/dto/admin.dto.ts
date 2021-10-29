import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";
import { IsUserAlreadyExist } from "../admin.decorator";

@Exclude()
export class AdminDto {
    @Expose()
    @ApiProperty()
    readonly id : number;

    @Expose()
    @ApiProperty()
    name : string;

    @Expose()
    @ApiProperty()
    username : string;

    @Expose()
    @ApiProperty()
    email : string;

    password : string;

    @Expose()
    @ApiProperty()
    user_type : string;

    @Expose()
    @ApiProperty()
    created_at : string;

    @Expose()
    @ApiProperty()
    updated_at : string;
}