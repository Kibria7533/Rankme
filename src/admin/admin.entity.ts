import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id : number

    @Column({type: "varchar" , nullable: true})
    name : string;

    @Column({type : "varchar" , nullable : false})
    username : string;


    @Column({type : "varchar" , nullable : false})
    email : string;

    @Column({type : "varchar" , nullable : false})
    password : string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: string;

    user_type : string;
}