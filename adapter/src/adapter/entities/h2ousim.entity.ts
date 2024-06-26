import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class H2ousim {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'h2ousim_id' })
  h2ousimId!: bigint;

  @Column({ name: 'usim_extension', nullable: true })
  usimExtension!: string;

  @Column({ name: 'eid_number', nullable: true })
  eidNumber!: string;

  @Column({ name: 'previous_order_number', nullable: true })
  previousOrderNumber!: string;

  @Column({ type: 'bigint', name: 'order_id', nullable: true })
  @Index()
  orderId!: bigint;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
