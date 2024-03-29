import { Controller } from '@nestjs/common';
import { UserProductionService } from '../services/user-production.service';
import { MessagePattern } from '@nestjs/microservices';
import { CheckUserReqDto, FindUserReqDto, SignupReqDto, ValidateReqDto } from '../dtos/req.dto';

@Controller()
export class UserProductionController {
  constructor(private readonly userProductionService: UserProductionService) {}

  @MessagePattern({ cmd: 'checkUserIsAdmin_production' })
  async checkUserIsAdmin({ uuid }: CheckUserReqDto): Promise<any> {
    return await this.userProductionService.checkUserIsAdmin(uuid);
  }

  @MessagePattern({ cmd: 'signup_production' })
  async signup({ email, password }: SignupReqDto): Promise<any> {
    return await this.userProductionService.signup(email, password);
  }

  @MessagePattern({ cmd: 'validateUser_production' })
  async validateUser({ email, password }: ValidateReqDto): Promise<any> {
    return await this.userProductionService.validateUser(email, password);
  }

  @MessagePattern({ cmd: 'findOneByEmail_production' })
  async findOneByEmail({ email }: FindUserReqDto): Promise<any> {
    const user = await this.userProductionService.findOneByEmail(email);

    return { id: user?.id || null };
  }
}
