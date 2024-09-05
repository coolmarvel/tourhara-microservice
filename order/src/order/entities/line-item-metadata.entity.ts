import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { LineItem } from './line-item.entity';

@Entity()
@Index(['lineItemId', 'key'])
export class LineItemMetadata {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'line_item_metadata_id' })
  lineItemMetadataId!: bigint;

  @Column({ type: 'bigint', name: 'line_item_id', nullable: true })
  lineItemId!: bigint;

  @Column({ type: 'bigint' })
  id!: bigint;

  @Column({ nullable: true })
  key!: string;

  @Column({ length: 8192, nullable: true })
  value!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => LineItem, (lineItem) => lineItem.lineItemMetadatas)
  @JoinColumn({ name: 'line_item_id', referencedColumnName: 'id' })
  lineItem!: LineItem;
}
