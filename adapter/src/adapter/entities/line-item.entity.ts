import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class LineItem {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'line_item_id' })
  lineItemId!: bigint;

  @Column({ type: 'bigint', nullable: true })
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

  @Column({ name: 'bundled_item_title', nullable: true })
  bundledItemTitle!: string;

  @Column({
    type: 'text',
    name: 'bundled_items',
    transformer: {
      to: (value: string[] | null): string | null => (value ? value.join(',') : null),
      from: (value: string): string[] | null => (value ? value.split(',') : null),
    },
    nullable: true,
  })
  bundledItems!: string[] | null;

  @Column({ type: 'bigint', name: 'order_id', nullable: true })
  orderId!: bigint;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
