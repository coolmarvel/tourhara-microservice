import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Shipping {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'shipping_id' })
  shippingId!: bigint;

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
  state!: string;

  @Column({ nullable: true })
  postcode!: string;

  @Column({ nullable: true })
  country!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ name: 'shipping_mobile', nullable: true })
  shippingMobile!: string;

  @Column({ type: 'bigint', name: 'order_id', nullable: true })
  @Index()
  orderId!: bigint;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
