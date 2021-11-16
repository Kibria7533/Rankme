import { Exclude } from 'class-transformer';
import { Voting } from '../voting/voting.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Rank } from '../rank/rank.entity';
@Entity()
export class College {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  // @Transform(
  //   ({ value }) => process.env.APP_URL + '/files/collegeImages/' + value,
  // )
  image: string;

  @Column({ type: 'varchar', nullable: true })
  image_author: string;

  @Column({ type: 'varchar', nullable: true })
  image_title: string;

  @Column({ type: 'varchar', nullable: true })
  image_url: string;

  @Column({ type: 'varchar', nullable: true })
  image_license: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  description_url: string;

  @Column({ type: 'date', nullable: true })
  founded_date: string;

  @Column({ nullable: true })
  website: string;

  @Column({  default: true,nullable: true })
  status: boolean;

  @Column({ type: 'bigint', default: 1 })
  rating: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: string;

  @Column({type: 'integer', default: 0})
  max_rating: number;

  @Column({type: 'integer' , default: 0})
  total_game: number;

  @OneToMany(() => Rank, (rank) => rank.college, {
    cascade: true,
    // eager: true,
  })

  @OneToMany(() => Voting, (voting) => voting.college, {
    cascade: true,
    // eager: true,
  })

  @Exclude()
  ranks: Rank[];

  @Exclude()
  votings: Voting[];

  rank : Array<string>;

  ratings : Array<string>;

  rank_number : number;
}
