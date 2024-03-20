import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { OrderStatus } from '../constants/order-status.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid', { name: 'order_id' })
  orderId: string;

  @Column('bigint')
  id: number;

  @Column('enum', { enum: OrderStatus, nullable: true })
  status: OrderStatus;

  @Column({ nullable: true })
  currency: string;

  @Column({ name: 'date_created', nullable: true })
  dateCreated: Date;

  @Column({ name: 'date_created_gmt', nullable: true })
  dateCreatedGmt: Date;

  @Column({ name: 'date_modified', nullable: true })
  dateModified: Date;

  @Column({ name: 'date_modified_gmt', nullable: true })
  dateModifiedGmt: Date;

  @Column({ name: 'date_completed', nullable: true })
  dateCompleted: Date;

  @Column({ name: 'date_completed_gmt', nullable: true })
  dateCompletedGmt: Date;

  @Column('uuid', { name: 'payment_id', nullable: true })
  paymentId: string;

  @Column('uuid', { name: 'billing_id', nullable: true })
  billingId: string;

  @Column('uuid', { name: 'shipping_id', nullable: true })
  shippingId: string;

  @Column('uuid', { name: 'metadata_id', nullable: true })
  metadataId: string;

  @Column('uuid', { name: 'line_item_id', nullable: true })
  lineItemId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
