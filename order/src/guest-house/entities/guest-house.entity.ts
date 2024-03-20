import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class GuestHouse {
  @PrimaryGeneratedColumn('uuid', { name: 'guest_house_id' })
  guestHouseId: string;

  @Column({ name: 'reserved_name', nullable: true })
  reservedName: string;

  @Column({ name: 'sex_age', nullable: true })
  sexAge: string;

  @Column({ name: 'mobile_guest', nullable: true })
  mobileGuest: string;

  @Column({ name: 'departure', nullable: true })
  departure: string;

  @Column({ name: 'arrival_time', nullable: true })
  arrivalTime: string;

  @Column({ name: 'security_deposit', nullable: true })
  securityDeposit: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
