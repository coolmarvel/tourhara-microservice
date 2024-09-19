import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Order } from './order.entity';

@Entity()
@Index(['orderId', 'key'])
export class JfkOneway {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'jfk_oneway_id' })
  jfk_oneway_Id!: bigint;

  @Column({ type: 'bigint', name: 'order_id', nullable: true })
  orderId!: bigint;

  @Column({ nullable: true })
  key!: string;

  @Column({ nullable: true })
  value!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => Order, (order) => order.jfkOneways)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order!: Order;
}
