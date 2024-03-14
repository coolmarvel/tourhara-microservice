import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class LineItem {
  @PrimaryGeneratedColumn('uuid', { name: 'line_item_id' })
  lineItemId: string;

  @Column('bigint', { nullable: true })
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  total: string;

  @Column({ nullable: true })
  subtotal: string;

  @Column('uuid', { name: 'metadata_id' })
  metadataId: string;

  @Column('uuid', { name: 'order_id' })
  orderId: string;

  @Column('uuid', { name: 'product_id' })
  productId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
