import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ProductTag {
  @PrimaryGeneratedColumn('uuid', { name: 'product_tag_id' })
  productTagId: string;

  @Column({ nullable: true })
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  slug: string;

  @Column({ nullable: true })
  count: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
