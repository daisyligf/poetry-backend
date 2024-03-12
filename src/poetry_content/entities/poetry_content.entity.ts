import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Timestamp,
} from 'typeorm';

@Entity()
export class PoetryContent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', name: 'poetry_meta_id' })
    poetryMetaId: number;

    @Column({ type: 'int', name: 'seq' })
    seq: number;

    @Column({type:'varchar', length: 500 })
    content: string;

    @CreateDateColumn({ name: 'create_time'})
    createTime: Timestamp;

    @UpdateDateColumn({ name: 'update_time'})
    updateTime: Timestamp;
}