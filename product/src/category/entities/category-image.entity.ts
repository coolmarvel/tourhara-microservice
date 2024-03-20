import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ProductCategoryImage {
  @PrimaryGeneratedColumn('uuid', { name: 'product_cateogry_image_id' })
  productCategoryImageId: string;

  @Column('bigint', { nullable: true })
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  src: string;

  @Column({ nullable: true })
  alt: string;

  @Column({ name: 'date_created', nullable: true })
  dateCreated: Date;

  @Column({ name: 'date_created_gmt', nullable: true })
  dateCreatedGmt: Date;

  @Column({ name: 'date_modified', nullable: true })
  dateModified: Date;

  @Column({ name: 'date_modified_gmt', nullable: true })
  dateModifiedGmt: Date;

  @Column('uuid', { name: 'product_category_id', nullable: true })
  productCategoryId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
