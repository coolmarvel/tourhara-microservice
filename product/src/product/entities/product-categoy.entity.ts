import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid', { name: 'product_category_id' })
  productCategoryId: string;

  @Column('bigint', { nullable: true })
  id: number;

  @Column('bigint', { nullable: true })
  parent: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  slug: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    name: 'product_category_image_id',
    type: 'text',
    transformer: {
      to: (value: string[]): string => JSON.stringify(value),
      from: (value: string): string[] => JSON.parse(value),
    },
    nullable: true,
  })
  productCategoryImageId: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
