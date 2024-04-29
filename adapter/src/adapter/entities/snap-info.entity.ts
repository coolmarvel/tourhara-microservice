import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class SnapInfo {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'snap_info_id' })
  snapInfoId!: bigint;

  @Column({ name: 'mobile_snap', nullable: true })
  mobileSnap!: string;

  @Column({ type: 'bigint', name: 'order_id', nullable: true })
  orderId!: bigint;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
