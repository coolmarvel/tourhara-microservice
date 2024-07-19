/**
 * User Entity
 *
 * @author 김이안
 */
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { UseYn } from '../constants/useYn.enum';

@Entity({ comment: '사용자 테이블' })
export class User {
  @PrimaryColumn({ name: 'user_id', unique: true, type: 'varchar', length: 50, comment: '유저 ID' })
  userId: string;

  @Column({ name: 'user_name', type: 'varchar', length: 50, comment: '유저명' })
  userName: string;

  @Column({ name: 'email_address', unique: true, type: 'varchar', length: 100, comment: '이메일' })
  emailAddress: string;

  @Column({ name: 'password', type: 'varchar', length: 255, comment: '비밀번호' })
  password: string;

  @Column({ name: 'company_code', type: 'varchar', length: 50, comment: '소속회사명' })
  companyCode: string;

  @Column({ name: 'department', type: 'varchar', length: 50, comment: '부서 or 외부업체' })
  department: string;

  @CreateDateColumn({ name: 'created_at', comment: '생성일자' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', onUpdate: 'CURRENT_TIMESTAMP(6)', comment: '변경일자' })
  updatedAt: Date;

  @Column({ name: 'use_yn', type: 'simple-enum', enum: UseYn, comment: '사용여부' })
  useYn: UseYn = UseYn.Yes;
}
