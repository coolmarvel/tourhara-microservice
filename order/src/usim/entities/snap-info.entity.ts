import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class SnapInfo {
  @PrimaryGeneratedColumn('uuid', { name: 'snap_info_id' })
  snapInfoId: string;

  @Column({ name: 'mobile_snap', nullable: true })
  mobileSnap: string;

  @Column('uuid', { name: 'order_id', nullable: true })
  orderId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
