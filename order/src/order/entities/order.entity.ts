import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { OrderStatus } from '../constants/order.enum';
import { Billing } from './billing.entity';
import { Shipping } from './shipping.entity';
import { OrderMetaData } from './order-metadata.entity';
import { LineItem } from './line-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid', { name: 'order_id' })
  orderId: string;

  @Column()
  id: number;

  @Column({ type: 'enum', enum: OrderStatus })
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

  @OneToOne(() => Billing, (billing) => billing.order, { cascade: true })
  @JoinColumn({ name: 'billing_id' })
  billing: Billing;

  @OneToOne(() => Shipping, (shipping) => shipping.order, { cascade: true })
  @JoinColumn({ name: 'shipping_id' })
  shipping: Shipping;

  @Column({ name: 'payment_method', nullable: true })
  paymentMethod: string;

  @Column({ name: 'payment_method_title', nullable: true })
  paymentMethodTitle: string;

  @Column({ name: 'transaction_id', nullable: true })
  transactionId: string;

  @OneToMany(() => OrderMetaData, (orderMetadata) => orderMetadata.order, { cascade: true })
  metadata: OrderMetaData[];

  @OneToMany(() => LineItem, (lineItem) => lineItem.order, { cascade: true })
  lineItems: LineItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
