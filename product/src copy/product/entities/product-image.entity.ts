import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@Index(['id'])
export class ProductImage {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'image_id' })
  imageId!: bigint;

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
