import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';


@Entity('helps')
class Helps {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    path: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_At: Date;

}


export default Helps;