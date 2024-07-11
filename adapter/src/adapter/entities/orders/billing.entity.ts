import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@Index(['orderId', 'key'])
export class Billing {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'billing_id' })
  billingId!: bigint;

  @Column({ type: 'bigint', name: 'order_id' })
  @Index()
  orderId!: bigint;

  @Column()
  @Index()
  key!: string;

  @Column()
  value!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
