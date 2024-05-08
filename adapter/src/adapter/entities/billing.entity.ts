import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Billing {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'billing_id' })
  billingId!: bigint;

  @Column({ name: 'first_name', nullable: true })
  firstName!: string;

  @Column({ name: 'last_name', nullable: true })
  lastName!: string;

  @Column({ nullable: true })
  company!: string;

  @Column({ name: 'address_1', nullable: true })
  address1!: string;

  @Column({ name: 'address_2', nullable: true })
  address2!: string;

  @Column({ nullable: true })
  city!: string;

  @Column({ nullable: true })
  email!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ nullable: true })
  survey!: string;

  @Column({ type: 'bigint', name: 'order_id' })
  @Index()
  orderId!: bigint;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
