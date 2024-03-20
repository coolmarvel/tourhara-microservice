import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class UsimInfo {
  @PrimaryGeneratedColumn('uuid', { name: 'usim_info_id' })
  usimInfoId: string;

  @Column({ name: 'delivery_option2', nullable: true })
  deliveryOption2: string;

  @Column({ name: 'departure_date2', nullable: true })
  departureDate2: string;

  @Column({ name: 'att_tmobile_date', nullable: true })
  attTMobileDate: string;

  @Column({ name: 'usim_name', nullable: true })
  usimName: string;

  @Column({ name: 'usim_address_1', nullable: true })
  usimAddress1: string;

  @Column({ name: 'usim_address_2', nullable: true })
  usimAddress2: string;

  @Column({ name: 'usim_postcode', nullable: true })
  usimPostcode: string;

  @Column({ name: 'esim_device', nullable: true })
  esimDevice: string;

  @Column({ name: 'esim_eid', nullable: true })
  esimEid: string;

  @Column({ name: 'esim_imei', nullable: true })
  esimImei: string;

  @Column({ name: 'notice_check_simcard', nullable: true })
  noticeCheckSimcard: string;

  @Column('uuid', { name: 'order_id', nullable: true })
  orderId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
