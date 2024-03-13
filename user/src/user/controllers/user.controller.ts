import { Controller } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { MessagePattern } from '@nestjs/microservices';
import { CheckUserReqDto, FindUserReqDto, SignupReqDto, ValidateReqDto } from '../dtos/req.dto';
import { CheckUserResDto, FindUserResDto, SignupResDto, ValidateResDto } from '../dtos/res.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'checkUserIsAdmin' })
  async checkUserIsAdmin({ uuid }: CheckUserReqDto): Promise<CheckUserResDto> {
    return await this.userService.checkUserIsAdmin(uuid);
  }

  @MessagePattern({ cmd: 'signup' })
  async signup({ email, password }: SignupReqDto): Promise<SignupResDto> {
    const user = await this.userService.signup(email, password);

    return { id: user.id };
  }

  @MessagePattern({ cmd: 'validateUser' })
  async validateUser({ email, password }: ValidateReqDto): Promise<ValidateResDto> {
    const { id } = await this.userService.validateUser(email, password);

    return { id };
  }

  @MessagePattern({ cmd: 'findOneByEmail' })
  async findOneByEmail({ email }: FindUserReqDto): Promise<FindUserResDto> {
    const user = await this.userService.findOneByEmail(email);

    return { id: user?.id || null };
  }
}
