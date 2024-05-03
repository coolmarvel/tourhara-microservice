import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'product_id' })
  productId!: bigint;

  @Column({ type: 'bigint' })
  @Index()
  id!: bigint;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  slug!: string;

  @Column({ nullable: true })
  type!: string;

  @Column({ nullable: true })
  status!: string;

  @Column({ nullable: true })
  featured!: boolean;

  @Column({ nullable: true })
  price!: string;

  @Column({ name: 'regular_price', nullable: true })
  regularPrice!: string;

  @Column({ name: 'on_sale', nullable: true })
  onSale!: boolean;

  @Column({ name: 'sale_price', nullable: true })
  salePrice!: string;

  @Column({ nullable: true })
  purchasable!: boolean;

  @Column({ length: 2048, nullable: true })
  variations!: string;

  @Column({ name: 'date_created', nullable: true })
  dateCreated!: Date;

  @Column({ name: 'date_created_gmt', nullable: true })
  dateCreatedGmt!: Date;

  @Column({ name: 'date_modified', nullable: true })
  dateModified!: Date;

  @Column({ name: 'date_modified_gmt', nullable: true })
  dateModifiedGmt!: Date;

  @Column({ name: 'category_id', nullable: true })
  categoryId!: string;

  @Column({ name: 'tag_id', nullable: true })
  tagId!: string;

  @Column({ name: 'image_id', nullable: true })
  imageId!: string;

  @Column({ name: 'attribute_id', nullable: true })
  attributeId!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
