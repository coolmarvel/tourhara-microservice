import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class OrderMetadata {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'order_metadata_id' })
  orderMetadataId!: bigint;

  @Column({ type: 'bigint', nullable: true })
  id!: bigint;

  @Column({ nullable: true })
  key!: string;

  @Column({
    type: 'text',
    transformer: {
      to: (value: string[] | null): string | null => (value ? JSON.stringify(value) : null),
      from: (value: string): string[] | null => (value ? JSON.parse(value) : null),
    },
    nullable: true,
  })
  value!: string[] | null;

  @Column({ type: 'bigint', name: 'order_id' })
  orderId!: bigint;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
