import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Timestamp,
} from 'typeorm';

@Entity("poetry_line")
export class PoetryLine {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'poetry_meta_id' })
    poetryMetaId: number;

    @Column({name: 'seq' })
    seq: number;

    @Column({length: 500 })
    content: string;

    @CreateDateColumn({ name: 'create_time'})
    createTime: Timestamp;

    @UpdateDateColumn({ name: 'update_time'})
    updateTime: Timestamp;
}