import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid', { name: 'product_id' })
  productId: string;

  @Column('bigint', { nullable: true })
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  slug: string;

  @Column({ name: 'date_created', nullable: true })
  dateCreated: Date;

  @Column({ name: 'date_created_gmt', nullable: true })
  dateCreatedGmt: Date;

  @Column({ name: 'date_midified', nullable: true })
  dateModified: Date;

  @Column({ name: 'date_midified_gmt', nullable: true })
  dateModifiedGmt: Date;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  featured: boolean;

  @Column({ nullable: true, length: 2000 })
  description: string;

  @Column({ nullable: true, length: 1000 })
  shortDescription: string;

  @Column({ nullable: true })
  price: string;

  @Column({ name: 'regular_price', nullable: true })
  regularPrice: string;

  @Column({ name: 'on_sale', nullable: true })
  onSale: boolean;

  @Column({ name: 'sale_price', nullable: true })
  salePrice: string;

  @Column({ nullable: true })
  purchasable: boolean;

  @Column({
    name: 'category_id',
    type: 'text',
    transformer: {
      to: (value: string[]): string => JSON.stringify(value),
      from: (value: string): string[] => JSON.parse(value),
    },
    nullable: true,
  })
  categoryId: string[];

  @Column({
    name: 'image_id',
    type: 'text',
    transformer: {
      to: (value: string[]): string => JSON.stringify(value),
      from: (value: string): string[] => JSON.parse(value),
    },
    nullable: true,
  })
  imageId: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
