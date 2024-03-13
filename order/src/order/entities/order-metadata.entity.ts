import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderMetaData {
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

  @ManyToOne(() => Order, (order) => order.metadata)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
