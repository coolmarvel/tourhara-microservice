import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class TourInfo {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'tour_info_id' })
  tourInfoId!: bigint;

  @Column({ name: 'whitney_date', nullable: true })
  whitneyDate!: string;

  @Column({ name: 'whitney_time', nullable: true })
  whitneyTime!: string;

  @Column({ name: 'guggen_date', nullable: true })
  guggenDate!: string;

  @Column({ name: 'guggen_time', nullable: true })
  guggenTime!: string;

  @Column({ name: 'un_name', nullable: true })
  unName!: string;

  @Column({ name: 'tour_kakaoid', nullable: true })
  tourKakaoId!: string;

  @Column({ name: 'airport_pickup_time', nullable: true })
  airportPickupTime!: string;

  @Column({ name: 'address', nullable: true })
  address!: string;

  @Column({ name: 'address_to', nullable: true })
  addressTo!: string;

  @Column({ name: 'flight_info', nullable: true })
  flightInfo!: string;

  @Column({ name: 'contact_info', nullable: true })
  contactInfo!: string;

  @Column({ type: 'bigint', name: 'order_id', nullable: true })
  orderId!: bigint;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
