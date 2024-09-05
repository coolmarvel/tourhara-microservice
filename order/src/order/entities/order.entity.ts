import { Column, CreateDateColumn, Entity, Index, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { OrderStatus } from '../constants';

import { Tour } from './tour.entity';
import { Billing } from './billing.entity';
import { Payment } from './payment.entity';
import { H2oUsim } from './h2o-usim.entity';
import { Shipping } from './shipping.entity';
import { LineItem } from './line-item.entity';
import { TourInfo } from './tour-info.entity';
import { SnapInfo } from './snap-info.entity';
import { UsimInfo } from './usim-info.entity';
import { JfkOneway } from './jfk-oneway.entity';
import { GuestHouse } from './guest-house.entity';
import { JfkShuttleRt } from './jfk-shuttle-rt.entity';
import { OrderMetadata } from './order-metadata.entity';

@Entity()
@Index(['id', 'dateCreated', 'dateCreatedGmt'])
export class Order {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'order_id' })
  orderId!: bigint;

  @Column({ type: 'bigint' })
  @Index()
  id!: bigint;

  @Column('enum', { enum: OrderStatus, nullable: true })
  status!: OrderStatus;

  @Column({ nullable: true })
  currency!: string;

  @Column({ name: 'currency_symbol', nullable: true })
  currencySymbol!: string;

  @Column({ name: 'date_created', nullable: true })
  dateCreated!: Date;

  @Column({ name: 'date_created_gmt', nullable: true })
  dateCreatedGmt!: Date;

  @Column({ name: 'date_modified', nullable: true })
  dateModified!: Date;

  @Column({ name: 'date_modified_gmt', nullable: true })
  dateModifiedGmt!: Date;

  @Column({ name: 'date_completed', nullable: true })
  dateCompleted!: Date;

  @Column({ name: 'date_completed_gmt', nullable: true })
  dateCompletedGmt!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToOne(() => Payment, (payment) => payment.order)
  payment!: Payment;

  @OneToMany(() => OrderMetadata, (orderMetadata) => orderMetadata.order)
  orderMetadatas!: OrderMetadata[];

  @OneToMany(() => LineItem, (lineItem) => lineItem.order)
  lineItems!: LineItem[];

  @OneToMany(() => Billing, (billing) => billing.order)
  billings!: Billing[];

  @OneToMany(() => Shipping, (shipping) => shipping.order)
  shippings!: Shipping[];

  @OneToMany(() => Tour, (tour) => tour.order)
  tours!: Tour[];

  @OneToMany(() => TourInfo, (tour) => tour.order)
  tourInfos!: TourInfo[];

  @OneToMany(() => UsimInfo, (usimInfo) => usimInfo.order)
  usimInfos!: UsimInfo[];

  @OneToMany(() => H2oUsim, (h2oUsim) => h2oUsim.order)
  h2oUsims!: H2oUsim[];

  @OneToMany(() => SnapInfo, (snapInfo) => snapInfo.order)
  snapInfos!: SnapInfo[];

  @OneToMany(() => GuestHouse, (guestHouse) => guestHouse.order)
  guestHouses!: GuestHouse[];

  @OneToMany(() => JfkOneway, (jfkOneway) => jfkOneway.order)
  jfkOneways!: JfkOneway[];

  @OneToMany(() => JfkShuttleRt, (jfkShuttleRt) => jfkShuttleRt.order)
  jfkShuttleRts!: JfkShuttleRt[];
}
