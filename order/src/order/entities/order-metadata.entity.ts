import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class OrderMetadata {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'order_metadata_id' })
  orderMetadataId!: bigint;

  @Column({ type: 'bigint', nullable: true })
  @Index()
  id!: bigint;

  @Column({ nullable: true })
  key!: string;

  @Column({ length: 2048, nullable: true })
  value!: string;

  @Column({ type: 'bigint', name: 'order_id' })
  @Index()
  orderId!: bigint;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
