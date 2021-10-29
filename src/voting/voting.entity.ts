import { College } from "../college/college.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Voting{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => College, (college) => college.votings)
    college: College;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: string;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: string;

}