import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LineItem } from './line-item.entity';

@Entity()
export class LineItemMetaData {
  @PrimaryGeneratedColumn('uuid', { name: 'line_item_metadata_id' })
  lineItemMetadataId: string;

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

  @ManyToOne(() => LineItem, (lineItem) => lineItem.metadata)
  @JoinColumn({ name: 'line_item_id' })
  lineItem: LineItem;
}
