import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Order } from './order.entity';
import { LineItemMetadata } from './line-item-metadata.entity';

@Entity()
@Index(['orderId', 'id', 'key'])
export class LineItem {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'line_item_id' })
  lineItemId!: bigint;

  @Column({ type: 'bigint', name: 'order_id', nullable: true })
  orderId!: bigint;

  @Column({ type: 'bigint' })
  @Index()
  id!: bigint;

  @Column({ nullable: true })
  key!: string;

  @Column({ nullable: true })
  value!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => Order, (order) => order.lineItems)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order!: Order;

  @OneToMany(() => LineItemMetadata, (metadata) => metadata.lineItem)
  lineItemMetadatas!: LineItemMetadata[];
}
