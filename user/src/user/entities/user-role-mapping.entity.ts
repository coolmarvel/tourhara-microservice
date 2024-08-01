import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 유저-역할 맵핑 테이블
 *
 * @authorr 김이안
 */
@Entity({ comment: '유저-역할 맵핑 테이블' })
export class UserRoleMapping {
  @PrimaryGeneratedColumn({ name: 'id', comment: 'PK' })
  id: number;

  @Column({ name: 'user_id', type: 'varchar', length: 50, nullable: false, comment: '사용자 ID' })
  userId: string;

  @Column({ name: 'role_id', nullable: false, comment: '역할 ID' })
  roleId: number;
}
