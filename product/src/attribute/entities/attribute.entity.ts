import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ProductAttribute {
  @PrimaryGeneratedColumn('uuid', { name: 'product_attribute_id' })
  productAttributeId: string;

  @Column('bigint', { nullable: true })
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  position: boolean;

  @Column({ nullable: true })
  visible: boolean;

  @Column({ nullable: true })
  variation: boolean;

  @Column({
    type: 'text',
    transformer: {
      to: (value: string[]): string => JSON.stringify(value),
      from: (value: string): string[] => JSON.parse(value),
    },
    nullable: true,
  })
  options: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
