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

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  featured: boolean;

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
    name: 'product_category_id',
    type: 'text',
    transformer: {
      to: (value: string[] | null): string | null => (value ? JSON.stringify(value) : null),
      from: (value: string): string[] | null => (value ? JSON.parse(value) : null),
    },
    nullable: true,
  })
  productCategoryId: string[] | null;

  @Column({
    name: 'product_tag_id',
    type: 'text',
    transformer: {
      to: (value: string[] | null): string | null => (value ? JSON.stringify(value) : null),
      from: (value: string): string[] | null => (value ? JSON.parse(value) : null),
    },
    nullable: true,
  })
  productTagId: string[];

  @Column({
    name: 'product_image_id',
    type: 'text',
    transformer: {
      to: (value: string[] | null): string | null => (value ? JSON.stringify(value) : null),
      from: (value: string): string[] | null => (value ? JSON.parse(value) : null),
    },
    nullable: true,
  })
  productImageId: string[] | null;

  @Column({
    name: 'product_attribute_id',
    type: 'text',
    transformer: {
      to: (value: string[] | null): string | null => (value ? JSON.stringify(value) : null),
      from: (value: string): string[] | null => (value ? JSON.parse(value) : null),
    },
    nullable: true,
  })
  productAttributeId: string[] | null;

  @Column({
    type: 'text',
    transformer: {
      to: (value: string[] | null): string | null => (value ? JSON.stringify(value) : null),
      from: (value: string): string[] | null => (value ? JSON.parse(value) : null),
    },
    nullable: true,
  })
  variations: string[] | null;

  @Column({ name: 'date_created', nullable: true })
  dateCreated: Date;

  @Column({ name: 'date_created_gmt', nullable: true })
  dateCreatedGmt: Date;

  @Column({ name: 'date_midified', nullable: true })
  dateModified: Date;

  @Column({ name: 'date_midified_gmt', nullable: true })
  dateModifiedGmt: Date;

  @Column('uuid', { name: 'product_type_id', nullable: true })
  productTypeId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
