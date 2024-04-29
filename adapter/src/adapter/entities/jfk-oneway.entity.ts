import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class JfkOneway {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'jfk_oneway_id' })
  jfkOnewayId!: bigint;

  @Column({ name: 'jfk_shuttle_time', nullable: true })
  jfkShuttleTime!: string;

  @Column({ name: 'drop_add', nullable: true })
  dropAdd!: string;

  @Column({ name: 'jfk_shuttle_stop2', nullable: true })
  jfkShuttleStop2!: string;

  @Column({ name: 'pickup_date_10', nullable: true })
  pickupDate10!: string;

  @Column({ name: 'jfk_shuttle_date2', nullable: true })
  jfkShuttleDate2!: string;

  @Column({ name: 'pickup_date_to_nj', nullable: true })
  pickupDateToNj!: string;

  @Column({ name: 'jfk_shuttle_nj_date2', nullable: true })
  jfkShuttleNjDate2!: string;

  @Column({ name: 'ewr_depart_date', nullable: true })
  ewrDepartDate!: string;

  @Column({ name: 'kakao_id1', nullable: true })
  kakaoId1!: string;

  @Column({ name: 'flight_num', nullable: true })
  flightNum!: string;

  @Column({ name: 'ewr_flight_num', nullable: true })
  ewrFlightNum!: string;

  @Column({ type: 'bigint', name: 'order_id', nullable: true })
  orderId!: bigint;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
