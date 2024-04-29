import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'tag_id' })
  tagId!: bigint;

  @Column({ type: 'bigint' })
  id!: bigint;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  slug!: string;

  @Column({ nullable: true })
  count!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
