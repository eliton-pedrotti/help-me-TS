import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne, ManyToMany } from 'typeorm';
import File from './Files';
import Help from './Help';

@Entity('helps')
class Helps {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    path: string

    @ManyToOne(() => File)
    @JoinColumn({ name: 'file_id' })
    file: File;

    @ManyToMany(() => Help)
    @JoinColumn({ name: 'help_id' })
    help: Help;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_At: Date;

}


export default Helps;

