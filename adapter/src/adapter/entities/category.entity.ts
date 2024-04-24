import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid', { name: 'product_category_id' })
  productCategoryId!: string;

  @Column({ nullable: true })
  id!: string;

  @Column({ nullable: true })
  parent!: string;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  slug!: string;

  @Column({ nullable: true })
  description!: string;

  @Column('uuid', { name: 'product_type_id', nullable: true })
  productTypeId!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
