import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsUrl } from 'class-validator';
import { Rank } from 'src/rank/rank.entity';
import { Voting } from 'src/voting/voting.entity';

@Exclude()
export class CollegeDto {
  @Expose()
  id: number;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @Expose()
  @ApiProperty()
  @Transform(({ value }) => process.env.APP_URL + '/collegeImages/' + value)
  image: string;

  @Expose()
  @ApiProperty()
  image_author:string;

  @Expose()
  @ApiProperty()
  image_title:string;

  @Expose()
  @ApiProperty()
  image_url:string;

  @Expose()
  @ApiProperty()
  image_license:string;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  city: string;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  state: string;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @Expose()
  @ApiProperty()
  description_url:string;

  @Expose()
  @ApiProperty()
  founded_date: string;

  @Expose()
  @ApiProperty()
  @IsUrl()
  website: string;

  @Expose()
  @ApiProperty()
  status: boolean;

  @Expose()
  @ApiProperty()
  rating: number;

  max_rating: number;

  total_game: number;

  created_at: string;

  updated_at: string;

  ranks: Array<Rank>;

  votings: Array<Voting>;

  @ApiProperty()
  @Expose()
  rank:Array<string>;

  @ApiProperty()
  @Expose()
  ratings: Array<string>;

  @ApiProperty()
  @Expose()
  rank_number : number;


}
