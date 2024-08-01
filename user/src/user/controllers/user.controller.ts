import { Controller } from '@nestjs/common';

import { UserService } from '../services';
import { User } from '../entities';
import { MessagePattern } from '@nestjs/microservices';

/**
 * 유저 컨트롤러
 *
 * @author 김이안
 */
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 유저 전체 조회
   */
  @MessagePattern({ cmd: 'getUsersAll' })
  async getUsersAll(): Promise<User[]> {
    return this.userService.getUsersAll();
  }
}
