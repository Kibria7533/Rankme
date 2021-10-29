import { text } from "express";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AboutUs{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({type : "varchar" , nullable:true})
    aboutus : string;

    @Column({type: "boolean"  , default: true})
    status : boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: string;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: string;
}