import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class LineItemMetadata {
  @PrimaryGeneratedColumn('uuid', { name: 'line_item_metadata_id' })
  lineItemMetadataId: string;

  @Column('bigint', { nullable: true })
  id: number;

  @Column({ nullable: true })
  key: string;

  @Column({
    type: 'text',
    transformer: {
      to: (value: string[] | null): string | null => (value ? JSON.stringify(value) : null),
      from: (value: string): string[] | null => (value ? JSON.parse(value) : null),
    },
    nullable: true,
  })
  value: string[] | null;

  @Column('uuid', { name: 'line_item_id', nullable: true })
  lineItemId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
