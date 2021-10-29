import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Admin } from "../admin.entity";
import { AdminDto } from "./admin.dto";

@Exclude()
export class LoginResponseDto{
    @Expose()
    @ApiProperty()
    access_token :string;

    @Expose()
    @ApiProperty()
    refresh_token : string;

    @Expose()
    @ApiProperty()
    login_user : AdminDto;
}

@Exclude()
export class LoginRequestDto{
    @Expose()
    @ApiProperty()
    @IsNotEmpty()
    username : string;

    @Expose()
    @ApiProperty()
    @IsNotEmpty()
    password : string;
}

@Exclude()
export class RefreshRequestDto{
    @Expose()
    @ApiProperty()
    @IsNotEmpty()
    refresh_token : string;

}

