import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class OrderMetadata {
  @PrimaryGeneratedColumn('uuid', { name: 'order_metadata_id' })
  orderMetadataId!: string;

  @Column({ nullable: true })
  id!: string;

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

  @Column('uuid', { name: 'order_id' })
  orderId!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
