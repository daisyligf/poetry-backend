import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Timestamp,
} from 'typeorm';

@Entity("poetry_meta")
export class PoetryMeta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    title: string;

    @Column({ length: 100 })
    dynasty: string;

    @Column({ length: 100 })
    author: string;

    @Column({ length: 100 })
    period: string;

    @Column({ length: 100 })
    prolog: string;

    @CreateDateColumn({ name: 'create_time' })
    createTime: Timestamp;

    @UpdateDateColumn({ name: 'update_time' })
    updateTime: Timestamp;
}