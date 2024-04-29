import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
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

  @Column({
    type: 'text',
    transformer: {
      to: (value: string[] | null): string | null => (value ? value.join(',') : null),
      from: (value: string): string[] | null => (value ? value.split(',') : null),
    },
    nullable: true,
  })
  options!: string | null;

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
