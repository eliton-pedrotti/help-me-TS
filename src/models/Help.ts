import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from './User';

@Entity('helps')
class Helps {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string

    @Column()
    user_id: string;

    @Column()
    value: string

    @Column()
    description: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id'})
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_At: Date;

}


export default Helps;