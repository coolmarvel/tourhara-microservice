import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@Index(['orderId', 'productId'])
export class LineItem {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'line_item_id' })
  lineItemId!: bigint;

  @Column({ type: 'bigint', nullable: true })
  @Index()
  id!: bigint;

  @Column({ nullable: true })
  name!: string;

  @Column({ type: 'bigint', name: 'product_id', nullable: true })
  productId!: bigint;

  @Column({ nullable: true })
  quantity!: string;

  @Column({ name: 'tax_class', nullable: true })
  taxClass!: string;

  @Column({ nullable: true })
  total!: string;

  @Column({ nullable: true })
  subtotal!: string;

  @Column({ name: 'subtotal_tax', nullable: true })
  subtotalTax!: string;

  @Column({ nullable: true })
  price!: string;

  @Column({ type: 'bigint', name: 'product_image_id', nullable: true })
  productImageId!: bigint;

  @Column({ name: 'parent_name', nullable: true })
  parentName!: string;

  @Column({ name: 'bundled_by', nullable: true })
  bundledBy!: string;

  @Column({ name: 'bundled_item_title', length: 2048, nullable: true })
  bundledItemTitle!: string;

  @Column({ name: 'bundled_items', length: 2048, nullable: true })
  bundledItems!: string;

  @Column({ type: 'bigint', name: 'order_id', nullable: true })
  @Index()
  orderId!: bigint;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
