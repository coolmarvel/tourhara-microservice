import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { OrderStatus } from '../../constants';

@Entity()
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
  @Index()
  dateCreated!: Date;

  @Column({ name: 'date_created_gmt', nullable: true })
  @Index()
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
}
