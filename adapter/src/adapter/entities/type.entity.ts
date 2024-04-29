import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProductTypeEnum } from '../constants/product-type.enum';

@Entity()
export class Type {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'type_id' })
  typeId!: bigint;

  @Column('enum', { enum: ProductTypeEnum, nullable: true })
  type!: ProductTypeEnum;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
