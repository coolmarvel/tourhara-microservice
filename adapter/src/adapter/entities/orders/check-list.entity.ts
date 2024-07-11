import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class CheckList {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'check_list_id' })
  checkListId!: bigint;

  @Column({ name: 'iso_date' })
  @Index()
  isoDate!: string;

  @Column()
  page!: string;

  @Column({ name: 'per_page' })
  perPage!: string;

  @Column({ name: 'daily_total' })
  dailyTotal!: string;

  @Column({ name: 'acc_total' })
  accTotal!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
