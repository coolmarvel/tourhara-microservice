import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Tour {
  @PrimaryGeneratedColumn('uuid', { name: 'tour_id' })
  tour_id!: string;

  @Column({ name: 'top_date', nullable: true })
  topDate!: string;

  @Column({ name: 'top_sunset', nullable: true })
  topSunset!: string;

  @Column({ name: 'tor_time_2', nullable: true })
  torTime2!: string;

  @Column({ name: 'date_summit', nullable: true })
  dateSummit!: string;

  @Column({ name: 'summit_daytime_time', nullable: true })
  summitDaytimeTime!: string;

  @Column({ name: 'summit_night_date', nullable: true })
  summitNightDate!: string;

  @Column({ name: 'summit_night_time', nullable: true })
  summitNightTime!: string;

  @Column({ name: 'summ_time_2', nullable: true })
  summTime2!: string;

  @Column({ name: 'summ_dec_date', nullable: true })
  summDecDate!: string;

  @Column({ name: 'summ_dec_time_2', nullable: true })
  summDecTime2!: string;

  @Column({ name: 'date_911', nullable: true })
  date911!: string;

  @Column({ name: 'time_911', nullable: true })
  time911!: string;

  @Column({ name: 'date_911_2', nullable: true })
  date911_2!: string;

  @Column({ name: 'time_911_2', nullable: true })
  time911_2!: string;

  @Column({ name: 'empire_date', nullable: true })
  empireDate!: string;

  @Column({ name: 'empire_time', nullable: true })
  empireTime!: string;

  @Column({ name: 'oneworld_date', nullable: true })
  oneworldDate!: string;

  @Column({ name: 'oneworld_time', nullable: true })
  oneworldTime!: string;

  @Column({ name: 'wollman_date', nullable: true })
  wollmanDate!: string;

  @Column({ name: 'wollman_high_date', nullable: true })
  wollmanHighDate!: string;

  @Column({ name: 'wollman_time', nullable: true })
  wollmanTime!: string;

  @Column({ name: 'wollman_time_2', nullable: true })
  wollmanTime2!: string;

  @Column({ name: 'yankees_name', nullable: true })
  yankeesName!: string;

  @Column({ name: 'ellis_island_date', nullable: true })
  ellisIslandDate!: string;

  @Column({ name: 'guggen_notice', nullable: true })
  guggenNotice!: string;

  @Column('uuid', { name: 'order_id', nullable: true })
  orderId!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
