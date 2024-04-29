import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'product_id' })
  productId!: bigint;

  @Column({ type: 'bigint' })
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

  @Column({
    name: 'category_id',
    type: 'text',
    transformer: {
      to: (value: string[] | null): string | null => (value ? value.join(',') : null),
      from: (value: string): string[] | null => (value ? value.split(',') : null),
    },
    nullable: true,
  })
  categoryId!: string[] | null;

  @Column({
    name: 'tag_id',
    type: 'text',
    transformer: {
      to: (value: string[] | null): string | null => (value ? value.join(',') : null),
      from: (value: string): string[] | null => (value ? value.split(',') : null),
    },
    nullable: true,
  })
  tagId!: string[];

  @Column({
    name: 'image_id',
    type: 'text',
    transformer: {
      to: (value: string[] | null): string | null => (value ? value.join(',') : null),
      from: (value: string): string[] | null => (value ? value.split(',') : null),
    },
    nullable: true,
  })
  imageId!: string[] | null;

  @Column({
    name: 'attribute_id',
    type: 'text',
    transformer: {
      to: (value: string[] | null): string | null => (value ? value.join(',') : null),
      from: (value: string): string[] | null => (value ? value.split(',') : null),
    },
    nullable: true,
  })
  attributeId!: string[] | null;

  @Column({
    type: 'text',
    transformer: {
      to: (value: string[] | null): string | null => (value ? value.join(',') : null),
      from: (value: string): string[] | null => (value ? value.split(',') : null),
    },
    nullable: true,
  })
  variations!: string[] | null;

  @Column({ name: 'date_created', nullable: true })
  dateCreated!: Date;

  @Column({ name: 'date_created_gmt', nullable: true })
  dateCreatedGmt!: Date;

  @Column({ name: 'date_modified', nullable: true })
  dateModified!: Date;

  @Column({ name: 'date_modified_gmt', nullable: true })
  dateModifiedGmt!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
