import { Controller } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { MessagePattern } from '@nestjs/microservices';
import { CheckUserReqDto, FindUserReqDto, SignupReqDto, ValidateReqDto } from '../dtos/req.dto';
import { CheckUserResDto, FindUserResDto, SignupResDto, ValidateResDto } from '../dtos/res.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // STAGING
  @MessagePattern({ cmd: 'checkUserIsAdmin_stag' })
  async checkUserIsAdmin_stag({ uuid }: CheckUserReqDto): Promise<CheckUserResDto> {
    return await this.userService.checkUserIsAdmin_stag(uuid);
  }

  @MessagePattern({ cmd: 'signup_stag' })
  async signup_stag({ email, password }: SignupReqDto): Promise<SignupResDto> {
    const user = await this.userService.signup_stag(email, password);

    return { id: user.id };
  }

  @MessagePattern({ cmd: 'validateUser_stag' })
  async validateUser_stag({ email, password }: ValidateReqDto): Promise<ValidateResDto> {
    const { id } = await this.userService.validateUser_stag(email, password);

    return { id };
  }

  @MessagePattern({ cmd: 'findOneByEmail_stag' })
  async findOneByEmail_stag({ email }: FindUserReqDto): Promise<FindUserResDto> {
    const user = await this.userService.findOneByEmail_stag(email);

    return { id: user?.id || null };
  }

  // PRODUCTION
  @MessagePattern({ cmd: 'checkUserIsAdmin_prod' })
  async checkUserIsAdmin_prod({ uuid }: CheckUserReqDto): Promise<CheckUserResDto> {
    return await this.userService.checkUserIsAdmin_prod(uuid);
  }

  @MessagePattern({ cmd: 'signup_prod' })
  async signup_prod({ email, password }: SignupReqDto): Promise<SignupResDto> {
    const user = await this.userService.signup_prod(email, password);

    return { id: user.id };
  }

  @MessagePattern({ cmd: 'validateUser_prod' })
  async validateUser_prod({ email, password }: ValidateReqDto): Promise<ValidateResDto> {
    const { id } = await this.userService.validateUser_prod(email, password);

    return { id };
  }

  @MessagePattern({ cmd: 'findOneByEmail_prod' })
  async findOneByEmail_prod({ email }: FindUserReqDto): Promise<FindUserResDto> {
    const user = await this.userService.findOneByEmail_prod(email);

    return { id: user?.id || null };
  }
}
