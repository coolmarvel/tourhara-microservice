import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'category_id' })
  categoryId!: bigint;

  @Column({ type: 'bigint' })
  @Index()
  id!: bigint;

  @Column({ nullable: true })
  @Index()
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
