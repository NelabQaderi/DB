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
  
@Entity({ name: 'instructors', schema: 'public' })
export class Instructors extends EntityHelper {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Index()
    @Column('varchar', { length: 256 })
    name: string;

    @Index()
    @Column('varchar', { length: 256 })
    fathername: string;
  
    @Column('varchar', { length: 128})
    phone_number: string;
  
    @Column('varchar', { length: 128})
    email: string;

    @Column('int')
    percentage: number;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn({ nullable: true, default: null })
    updatedAt: Date | null;
  
    @DeleteDateColumn({ nullable: true, default: null })
    deletedAt?: Date | null;
}
