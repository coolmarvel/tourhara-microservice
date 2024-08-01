import { Controller } from '@nestjs/common';
import { RoleService } from '../services';
import { MessagePattern } from '@nestjs/microservices';
import { UserRoleReqDto, UserRoleResDto } from '../dtos';
import { Role } from '../entities';

/**
 * 역할 컨트롤러
 *
 * @author 김이안
 */
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  /**
   * 역할 전체 조회
   */
  @MessagePattern({ cmd: 'getRolesAll' })
  async getRolesAll(): Promise<Role[]> {
    return this.roleService.getRolesAll();
  }

  /**
   * 해당 유저가 보유한 모든 역할 조회
   *
   * @param reqDto
   */
  @MessagePattern({ cmd: 'getRolesAllByUserId' })
  async getRolesAllByUserId(reqDto: UserRoleReqDto): Promise<UserRoleResDto[]> {
    return this.roleService.getRolesAllByUserId(reqDto);
  }
}
