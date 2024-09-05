import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Controller, Get, Query, UseGuards, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common';
import { RoleService } from '../services/role.service';
import { RoleResDto, UserRoleReqDto, UserRoleResDto } from '../dtos';

/**
 * 역할 API Controller
 *
 * @author 김이안
 */
@UseGuards(JwtAuthGuard)
@ApiTags('System')
@Controller({ path: 'api/system', version: VERSION_NEUTRAL })
export class RoleApiController {
  constructor(private readonly roleService: RoleService) {}

  /**
   * 역할 전체 조회 API
   */
  @Get('roles')
  @Public()
  @ApiOperation({ summary: '역할 전체 조회 API' })
  async getRolesAll(): Promise<RoleResDto[]> {
    return await this.roleService.getRolesAll();
  }

  /**
   * 해당 유저가 보유한 모든 역할 조회 API
   *
   * @param reqDto
   */
  @Get('user-roles')
  @Public()
  @ApiOperation({ summary: 'getRolesAllByUserId' })
  async getRolesAllByUserId(@Query() reqDto: UserRoleReqDto): Promise<UserRoleResDto[]> {
    return this.roleService.getRolesAllByUserId(reqDto);
  }
}
