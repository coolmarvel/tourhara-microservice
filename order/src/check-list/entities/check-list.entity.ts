import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class CheckList {
  @PrimaryGeneratedColumn('uuid', { name: 'check_list_id' })
  checkListId: string;

  @Column({ name: 'iso_date' })
  isoDate: string;

  @Column('bigint')
  page: number;

  @Column('bigint', { name: 'per_page' })
  perPage: number;

  @Column('bigint', { name: 'daily_total' })
  dailyTotal: bigint;

  @Column('bigint', { name: 'acc_total' })
  accTotal: bigint;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
