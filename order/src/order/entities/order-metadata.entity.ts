import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class OrderMetadata {
  @PrimaryGeneratedColumn('uuid', { name: 'order_metadata_id' })
  orderMetadataId: string;

  @Column()
  id: number;

  @Column()
  key: string;

  @Column({
    type: 'text',
    transformer: {
      to(value: string | object): string {
        return JSON.stringify(value);
      },
      from(value: string): string | object {
        try {
          return JSON.parse(value);
        } catch (error) {
          return value;
        }
      },
    },
  })
  value: string | object;

  @Column({ type: 'uuid', name: 'order_id' })
  orderId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
