import { Controller } from '@nestjs/common';
import { UserStagingService } from '../services/user-staging.service';
import { MessagePattern } from '@nestjs/microservices';
import { CheckUserReqDto, FindUserReqDto, SignupReqDto, ValidateReqDto } from '../dtos/req.dto';

@Controller()
export class UserStagingController {
  constructor(private readonly userStagingService: UserStagingService) {}

  @MessagePattern({ cmd: 'checkUserIsAdmin_staging' })
  async checkUserIsAdmin({ uuid }: CheckUserReqDto): Promise<any> {
    return await this.userStagingService.checkUserIsAdmin(uuid);
  }

  @MessagePattern({ cmd: 'signup_staging' })
  async signup({ email, password }: SignupReqDto): Promise<any> {
    return await this.userStagingService.signup(email, password);
  }

  @MessagePattern({ cmd: 'validateUser_staging' })
  async validateUser({ email, password }: ValidateReqDto): Promise<any> {
    return await this.userStagingService.validateUser(email, password);
  }

  @MessagePattern({ cmd: 'findOneByEmail_staging' })
  async findOneByEmail({ email }: FindUserReqDto): Promise<any> {
    const user = await this.userStagingService.findOneByEmail(email);

    return { id: user?.id || null };
  }
}
