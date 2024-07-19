/**
 * 유저 컨트롤러
 *
 * @author 김이안
 */
import { Controller } from '@nestjs/common';

import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 유저 전체 조회
   */
  @MessagePattern({ cmd: 'getUsersAll' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
