import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class LineItem {
  @PrimaryGeneratedColumn('uuid', { name: 'line_item_id' })
  lineItemId: string;

  @Column({ nullable: true })
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column('uuid', { name: 'product_id', nullable: true })
  productId: string;

  @Column({ nullable: true })
  quantity: string;

  @Column({ name: 'tax_class', nullable: true })
  taxClass: string;

  @Column({ nullable: true })
  total: string;

  @Column({ nullable: true })
  subtotal: string;

  @Column({ name: 'subtotal_tax', nullable: true })
  subtotalTax: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  price: string;

  @Column('uuid', { name: 'product_image_id', nullable: true })
  productImageId: string;

  @Column({ name: 'parent_name', nullable: true })
  parentName: string;

  @Column({ name: 'bundled_by', nullable: true })
  bundledBy: string;

  @Column({ name: 'bundled_item_title', nullable: true })
  bundledItemTitle: string;

  @Column({
    type: 'text',
    name: 'bundled_items',
    transformer: {
      to: (value: string[] | null): string | null => (value ? JSON.stringify(value) : null),
      from: (value: string): string[] | null => (value ? JSON.parse(value) : null),
    },
    nullable: true,
  })
  bundledItems: string[] | null;

  @Column('uuid', { name: 'order_id', nullable: true })
  orderId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
