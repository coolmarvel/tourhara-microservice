import { RoleGroup, RoleType } from '../constants';
import { Role } from '../entities';
import { Injectable } from '@nestjs/common';

/**
 * Role Mapper
 *
 * @author 김이안
 */
@Injectable()
export class RoleMapper {
  /**
   * row 를 User 객체로 변환하기 위한 함수
   *
   * @param row
   */
  toRole(row: { id: number; role_group: RoleGroup; role_type: RoleType; role_code: string; role_name: string }): Role {
    const role = new Role();
    role.id = row.id;
    role.roleGroup = row.role_group;
    role.roleType = row.role_type;
    role.roleCode = row.role_code;
    role.roleName = row.role_name;
    return role;
  }
}
