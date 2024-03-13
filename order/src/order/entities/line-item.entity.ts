import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LineItemMetaData } from './line-item-metadata.entity';
import { Order } from './order.entity';

@Entity()
export class LineItem {
  @PrimaryGeneratedColumn('uuid', { name: 'line_item_id' })
  lineItemId: string;

  @Column()
  id: number;

  @Column({ type: 'varchar', length: 500})
  name: string;

  @Column()
  quantity: number;

  @Column()
  total: string;

  @Column()
  subtotal: string;

  @OneToMany(() => LineItemMetaData, (metadata) => metadata.lineItem, { cascade: true })
  metadata: LineItemMetaData[];

  @ManyToOne(() => Order, (order) => order.lineItems)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
