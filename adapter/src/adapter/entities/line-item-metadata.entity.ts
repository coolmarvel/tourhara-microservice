import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class LineItemMetadata {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'line_item_metadata_id' })
  lineItemMetadataId!: bigint;

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

  @Column({ type: 'bigint', name: 'line_item_id', nullable: true })
  lineItemId!: bigint;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
