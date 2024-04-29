import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class CategoryImage {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'category_image_id' })
  categoryImageId!: bigint;

  @Column({ type: 'bigint' })
  id!: bigint;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  src!: string;

  @Column({ nullable: true })
  alt!: string;

  @Column({ name: 'date_created', nullable: true })
  dateCreated!: Date;

  @Column({ name: 'date_created_gmt', nullable: true })
  dateCreatedGmt!: Date;

  @Column({ name: 'date_modified', nullable: true })
  dateModified!: Date;

  @Column({ name: 'date_modified_gmt', nullable: true })
  dateModifiedGmt!: Date;

  @Column({ type: 'bigint', name: 'category_id', nullable: true })
  categoryId!: bigint;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
