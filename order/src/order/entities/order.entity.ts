import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { OrderStatus } from '../constants/order-status.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid', { name: 'order_id' })
  orderId: string;

  @Column('bigint')
  id: number;

  @Column('enum', { enum: OrderStatus })
  status: OrderStatus;

  @Column({ nullable: true })
  currency: string;

  @Column({ name: 'date_created', nullable: true })
  dateCreated: Date;

  @Column({ name: 'date_modified', nullable: true })
  dateModified: Date;

  @Column({ name: 'date_completed', nullable: true })
  dateCompleted: Date;

  @Column({ name: 'date_paid', nullable: true })
  datePaid: Date;

  @Column({ name: 'payment_method', nullable: true })
  paymentMethod: string;

  @Column({ name: 'payment_method_title', nullable: true })
  paymentMethodTitle: string;

  @Column({ name: 'transaction_id', nullable: true })
  transactionId: string;

  @Column({ type: 'uuid', name: 'billing_id' })
  billingId: string;

  @Column({ type: 'uuid', name: 'shipping_id' })
  shippingId: string;

  @Column('uuid', { name: 'metadata_id' })
  metadataId: string;

  @Column('uuid', { name: 'line_item_id' })
  lineItemId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
