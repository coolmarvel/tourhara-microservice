import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from '../services/user.service';
import { UserResDto } from '../dtos';
import { Public } from '../../common';

/**
 * 유저 API Controller
 *
 * @author 김이안
 */
@ApiTags('System')
@Controller({ path: 'api/system', version: VERSION_NEUTRAL })
export class UserApiController {
  constructor(private readonly userService: UserService) {}

  /**
   * 유저 전체 조회 API
   */
  @Get('users')
  @Public()
  @ApiOperation({ summary: '유저 전체 조회 API' })
  async getUsersAll(): Promise<UserResDto[]> {
    return await this.userService.getUsersAll();
  }
}
