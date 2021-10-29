import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";
import { IsUserAlreadyExist } from "../admin.decorator";

@Exclude()
export class AdminCreateDto {
    @Expose()
    // @ApiProperty()
    readonly id : number;

    @Expose()
    @ApiProperty()
    @IsNotEmpty()
    name : string;

    @Expose()
    @ApiProperty()
    @IsNotEmpty()
    @IsUserAlreadyExist({message : "Username already taken"})
    username : string;

    @Expose()
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email : string;

    @Expose()
    @ApiProperty()
    @IsNotEmpty()
    password : string;

    created_at : string;

    updated_at : string;
}
