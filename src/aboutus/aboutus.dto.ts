import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, isNotEmpty } from "class-validator";

@Exclude()
export class AboutUsDto {

    @ApiProperty()
    @Expose()
    id : number;

    @ApiProperty()
    @Expose()
    @IsNotEmpty()
    aboutus : string;

    @ApiProperty()
    @Expose()
    status : boolean;

    @ApiProperty()
    @Expose()
    created_at : string;

    @ApiProperty()
    @Expose()
    updated_at : string;
}