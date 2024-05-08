import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class LineItemMetadata {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'line_item_metadata_id' })
  lineItemMetadataId!: bigint;

  @Column({ type: 'bigint', nullable: true })
  @Index()
  id!: bigint;

  @Column({ nullable: true })
  key!: string;

  @Column({ length: 10000, nullable: true })
  value!: string;

  @Column({ type: 'bigint', name: 'product_id', nullable: true })
  productId!: bigint;

  @Column({ nullable: true })
  quantity!: number;

  @Column({ nullable: true })
  title!: string;

  @Column({ name: 'optional_selected', nullable: true })
  optionalSelected!: string;

  @Column({ nullable: true })
  attributes!: string;

  @Column({ type: 'bigint', name: 'variation_id', nullable: true })
  variationId!: bigint;

  @Column({ nullable: true })
  discount!: string;

  @Column({ type: 'bigint', name: 'line_item_id', nullable: true })
  lineItemId!: bigint;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
