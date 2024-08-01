import { IRoleService } from '../interfaces';
import { Role } from '../entities';
import { Injectable } from '@nestjs/common';
import { RoleRepository, UserRoleMappingRepository } from '../repositories';
import { UserRoleReqDto, UserRoleResDto } from '../dtos';

/**
 * 역할 서비스
 *
 * @author 김이안
 */
@Injectable()
export class RoleService implements IRoleService {
  constructor(
    private roleRepository: RoleRepository,
    private userRoleMappingRepository: UserRoleMappingRepository,
  ) {}

  /**
   * 역할 전체 조회
   */
  getRolesAll(): Promise<Role[]> {
    try {
      return this.roleRepository.getRolesAll();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * 해당 유저가 보유한 모든 역할 조회
   *
   * @param reqDto
   */
  getRolesAllByUserId(reqDto: UserRoleReqDto): Promise<UserRoleResDto[]> {
    try {
      return this.userRoleMappingRepository.getRolesAllByUserId(reqDto);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
