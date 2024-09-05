import { Injectable } from '@nestjs/common';
import { UserRoleResDto } from '../dtos';

/**
 * User Role Mapper
 *
 * @author 김이안
 */
@Injectable()
export class UserRoleMappingMapper {
  /**
   * row 를 UserRoleResDto 객체로 변환하기 위한 함수
   *
   * @param row
   */
  toUserRoleResDto(row): UserRoleResDto {
    const resDto = new UserRoleResDto();
    resDto.roleCode = row.role_code;
    return resDto;
  }
}
