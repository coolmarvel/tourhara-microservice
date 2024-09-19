import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@Index(['id', 'parent'])
export class Category {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'category_id' })
  categoryId!: bigint;

  @Column({ type: 'bigint' })
  id!: bigint;

  @Column({ nullable: true })
  parent!: string;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  slug!: string;

  @Column({ nullable: true })
  description!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
