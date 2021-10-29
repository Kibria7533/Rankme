import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { College } from '../college/college.entity';
@Entity()
export class Rank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rank: number;

  @Column()
  rating: number;

  @ManyToOne(() => College, (college) => college.ranks)
  college: College;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: string;
}
