import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@Index(['lineItemId', 'key'])
export class LineItemMetadata {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'line_item_metadata_id' })
  lineItemMetadataId!: bigint;

  @Column({ type: 'bigint', name: 'line_item_id' })
  @Index()
  lineItemId!: bigint;

  @Column({ type: 'bigint' })
  id!: bigint;

  @Column()
  @Index()
  key!: string;

  @Column({ length: 8192 })
  value!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
