import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@Index(['id', 'name', 'position', 'visible', 'variation', 'options'])
export class Attribute {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'attribute_id' })
  attributeId!: bigint;

  @Column({ type: 'bigint' })
  id!: bigint;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  position!: boolean;

  @Column({ nullable: true })
  visible!: boolean;

  @Column({ nullable: true })
  variation!: boolean;

  @Column({ nullable: true })
  options!: string;

  @Column({ nullable: true })
  slug!: string;

  @Column({ nullable: true })
  type!: string;

  @Column({ name: 'has_archives', nullable: true })
  hasArchivees!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
