import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Index,
  } from 'typeorm';
  import { EntityHelper } from 'src/utils/database/entity-helper';
  
@Entity({ name: 'classes', schema: 'public' })
export class Classes extends EntityHelper {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Index()
    @Column('varchar', { length: 256 })
    class_name: string;

    @Index()
    @Column('varchar', { length: 256 })
    instructor_id: string;

    @Column('int')
    class_duration: number;
  
    @Column('date')
    start_date: Date;
  
    @Column('varchar', { length: 256 })
    start_time: string;

    @Column('int')
    class_fee: number;

    @Column('varchar', {length: 256})
    class_fee_currency: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn({ nullable: true, default: null })
    updatedAt: Date | null;
  
    @DeleteDateColumn({ nullable: true, default: null })
    deletedAt?: Date | null;
}
