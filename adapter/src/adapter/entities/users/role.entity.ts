import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { RoleGroup, RoleType, enumToArray } from '../../constants';

/**
 * 역할 관리 테이블
 *
 * @author 김이안
 */
@Entity({ comment: '역할 관리 테이블' })
export class Role {
  @PrimaryGeneratedColumn({ name: 'id', comment: 'PK' })
  id!: number;

  @Column({ name: 'role_group', type: 'simple-enum', enum: RoleGroup, nullable: false, comment: '역할 그룹명' })
  roleGroup: RoleGroup = RoleGroup.USER;

  @Column({ name: 'role_type', type: 'simple-enum', enum: enumToArray(RoleType), nullable: false, comment: '역할 유형명' })
  roleType: RoleType = RoleType.SERVICE_USER;

  @Column({ name: 'role_code', type: 'varchar', length: 255, nullable: false, comment: '역할코드' })
  roleCode!: string;

  @Column({ name: 'role_name', type: 'varchar', length: 255, nullable: false, comment: '역할명' })
  roleName!: string;
}
