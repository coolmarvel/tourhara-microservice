import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Order } from './order.entity';

@Entity()
@Index(['orderId', 'key'])
export class OrderMetadata {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'order_metadata_id' })
  orderMetadataId!: bigint;

  @Column({ type: 'bigint', name: 'order_id', nullable: true })
  orderId!: bigint;

  @Column({ type: 'bigint' })
  id!: bigint;

  @Column({ nullable: true })
  key!: string;

  @Column({ type: 'text', nullable: true })
  value!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => Order, (order) => order.orderMetadatas)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order!: Order;
}
