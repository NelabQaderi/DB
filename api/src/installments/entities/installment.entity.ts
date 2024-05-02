import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Index,
  } from 'typeorm';
  import { EntityHelper } from 'src/utils/database/entity-helper';
  
  @Entity({ name: 'installments', schema: 'public' })
  export class Installments extends EntityHelper {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Index()
    @Column('varchar', { length: 128 })
    student_id: string;

    @Index()
    @Column('varchar', { length: 128 })
    class_id: string;
  
    @Column('varchar', { length: 128 })
    installment_type: string;

    @Column('int')
    installment_amount: number;
  
    @CreateDateColumn({ nullable: true, default: null })
    installment_date: Date | null;
  
    @Column('boolean', {default: false})
    installment_received: boolean;  
  }

