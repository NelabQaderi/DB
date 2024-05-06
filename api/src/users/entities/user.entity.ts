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
  
  @Entity({ name: 'users', schema: 'public' })
  export class Users extends EntityHelper {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Index()
    @Column('varchar', { length: 128, unique: true })
    username: string;

    @Index()
    @Column('varchar', { length: 128 })
    password: string;
  
    @Column('varchar', { length: 256, nullable: false})
    accessType?: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn({ nullable: true, default: null })
    updatedAt: Date | null;
  
    @DeleteDateColumn({ nullable: true, default: null })
    deletedAt?: Date | null;
  }
