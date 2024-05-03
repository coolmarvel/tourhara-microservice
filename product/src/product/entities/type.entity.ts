import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProductTypeEnum } from '../constants/product-type.enum';

@Entity()
export class Type {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: bigint;

  @Column('enum', { enum: ProductTypeEnum, nullable: true })
  @Index()
  type!: ProductTypeEnum;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
