import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { UserService } from '../services/user.service';
import { CheckUserReqDto, FindUserReqDto, SignupReqDto, ValidateReqDto } from '../dtos/req.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'checkUserIsAdmin' })
  async checkUserIsAdmin({ uuid }: CheckUserReqDto): Promise<any> {
    try {
      return await this.userService.checkUserIsAdmin(uuid);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: 'signup' })
  async signup({ email, password }: SignupReqDto): Promise<any> {
    try {
      return await this.userService.signup(email, password);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: 'validateUser' })
  async validateUser({ email, password }: ValidateReqDto): Promise<any> {
    try {
      return await this.userService.validateUser(email, password);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: 'findOneByEmail' })
  async findOneByEmail({ email }: FindUserReqDto): Promise<any> {
    try {
      const user = await this.userService.findOneByEmail(email);

      return { id: user?.id || null };
    } catch (error) {
      throw error;
    }
  }
}
