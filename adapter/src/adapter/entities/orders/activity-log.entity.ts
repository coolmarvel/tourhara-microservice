import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from '../users';
import { Order } from './order.entity';
import { ActivityStatus } from '../../constants';

@Entity()
export class ActivityLog {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'activity_log_id' })
  activityLogId!: bigint;

  @Column({ type: 'bigint', name: 'order_id', nullable: true })
  orderId!: bigint;

  @Column({ type: 'varchar', name: 'user_id' })
  userId!: string;

  @Column('enum', { enum: ActivityStatus, nullable: true })
  activity!: ActivityStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => Order, (order) => order.activityLogs)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order!: Order;

  @ManyToOne(() => User, (user) => user.activityLogs)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user!: User;
}
