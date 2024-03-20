import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class JfkShuttleRt {
  @PrimaryGeneratedColumn('uuid', { name: 'jfk_shuttle_rt_id' })
  jfkShuttleRtId: string;

  @Column({ name: 'jfk_shuttle_time2', nullable: true })
  jfkShuttleTime2: string;

  @Column({ name: 'drop_add_2', nullable: true })
  dropAdd2: string;

  @Column({ name: 'night_drop', nullable: true })
  nightDrop: string;

  @Column({ name: 'pickup_date_30', nullable: true })
  pickupDate30: string;

  @Column({ name: 'pickup_date_night', nullable: true })
  pickupDateNight: string;

  @Column({ name: 'pickup_date_fromnj', nullable: true })
  pickupDateFromNj: string;

  @Column({ name: 'pickup_date_nj_night', nullable: true })
  pickupDateNjNight: string;

  @Column({ name: 'ewr_arrive_date', nullable: true })
  ewrArriveDate: string;

  @Column({ name: 'kakao_id2', nullable: true })
  kakaoId2: string;

  @Column({ name: 'flight_num2', nullable: true })
  flighNum2: string;

  @Column({ name: 'ewr_flght_num2', nullable: true })
  ewrFlightNum2: string;

  @Column('uuid', { name: 'order_id', nullable: true })
  orderId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
