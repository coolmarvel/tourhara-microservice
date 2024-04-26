import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'payment_id' })
  paymentId!: bigint;

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

  @Column({ name: 'needs_processing', nullable: true })
  needsProcessing!: boolean;

  @Column({ name: 'date_paid', nullable: true })
  datePaid!: Date;

  @Column({ name: 'date_paid_gmt', nullable: true })
  datePaidGmt!: Date;

  @Column({ type: 'bigint', name: 'order_id' })
  orderId!: bigint;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
