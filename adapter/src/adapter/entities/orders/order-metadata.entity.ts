import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@Index(['orderId', 'key'])
export class OrderMetadata {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'order_metadata_id' })
  orderMetadataId!: bigint;

  @Column({ type: 'bigint', name: 'order_id' })
  @Index()
  orderId!: bigint;

  @Column({ type: 'bigint' })
  id!: bigint;

  @Column()
  @Index()
  key!: string;

  @Column({ type: 'text' })
  value!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
