import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Order } from './order.entity';

@Entity()
@Index(['orderId'])
export class Payment {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'payment_id' })
  paymentId!: bigint;

  @Column({ type: 'bigint', name: 'order_id', nullable: true })
  orderId!: bigint;

  @Column({ name: 'payment_method', nullable: true })
  paymentMethod!: string;

  @Column({ name: 'payment_method_title', nullable: true })
  paymentMethodTitle!: string;

  @Column({ name: 'transaction_id', nullable: true })
  transactionId!: string;

  @Column({ name: 'payment_url', nullable: true })
  paymentUrl!: string;

  @Column({ name: 'needs_payment', nullable: true })
  needsPayment!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToOne(() => Order, (order) => order.payment)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order!: Order;
}
