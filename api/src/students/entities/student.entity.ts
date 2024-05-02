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
  
@Entity({ name: 'students', schema: 'public' })
export class Students extends EntityHelper {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Index()
    @Column('varchar', { length: 256 })
    student_name: string;

    @Index()
    @Column('varchar', { length: 256 })
    student_fathername: string;

    @Column('varchar', { length: 256 })
    student_phone_number: string;

    @Column('varchar', { length: 256, nullable: true })
    student_address: string;

    @Column('varchar', { length: 256 })
    student_photo: string;

    @CreateDateColumn()
    student_registeration_date: Date;
  
    @UpdateDateColumn({ nullable: true, default: null })
    updatedAt: Date | null;
  
    @DeleteDateColumn({ nullable: true, default: null })
    deletedAt?: Date | null;
}
