import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class CouponLine {
  @PrimaryGeneratedColumn('uuid', { name: 'coupon_line_id' })
  couponLineId: string;

  @Column('bigint', { nullable: true })
  id: number;

  @Column({ nullable: true })
  code: string;

  @Column({ nullable: true })
  amount: string;

  @Column({ nullable: true })
  status: string;

  @Column({ name: 'date_created', nullable: true })
  dateCreated: Date;

  @Column({ name: 'date_modified', nullable: true })
  dateModified: Date;

  @Column({
    name: 'product_category_id',
    type: 'text',
    transformer: {
      to: (value: string[] | null): string | null => (value ? JSON.stringify(value) : null),
      from: (value: string): string[] | null => (value ? JSON.parse(value) : null),
    },
    nullable: true,
  })
  productCategoryId: string[] | null;

  @Column('uuid', { name: 'order_id', nullable: true })
  orderId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
