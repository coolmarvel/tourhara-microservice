import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class H2ousim {
  @PrimaryGeneratedColumn('uuid', { name: 'h2ousim_id' })
  h2ousimId: string;

  @Column({ name: 'usim_extension', nullable: true })
  usimExtension: string;

  @Column({ name: 'eid_number', nullable: true })
  eidNumber: string;

  @Column({ name: 'previous_order_number', nullable: true })
  previousOrderNumber: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
