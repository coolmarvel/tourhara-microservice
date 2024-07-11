import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@Index(['orderId', 'key'])
export class JfkShuttleRt {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'jfk_shuttle_rt_id' })
  jfkShuttleRtId!: bigint;

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
