import { Controller } from '@nestjs/common';
import { UserProductionService } from '../../services/production/user.production.service';
import { MessagePattern } from '@nestjs/microservices';
import { CheckUserReqDto, FindUserReqDto, SignupReqDto, ValidateReqDto } from '../../dtos/req.dto';

@Controller()
export class UserProductionController {
  constructor(private readonly userService: UserProductionService) {}

  @MessagePattern({ cmd: 'checkUserIsAdmin_production' })
  async checkUserIsAdmin({ uuid }: CheckUserReqDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await this.userService.checkUserIsAdmin(uuid));
      } catch (error) {
        return reject(error);
      }
    });
  }

  @MessagePattern({ cmd: 'signup_production' })
  async signup({ email, password }: SignupReqDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await this.userService.signup(email, password));
      } catch (error) {
        return reject(error);
      }
    });
  }

  @MessagePattern({ cmd: 'validateUser_production' })
  async validateUser({ email, password }: ValidateReqDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await this.userService.validateUser(email, password));
      } catch (error) {
        return reject(error);
      }
    });
  }

  @MessagePattern({ cmd: 'findOneByEmail_production' })
  async findOneByEmail({ email }: FindUserReqDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userService.findOneByEmail(email);

        return resolve({ id: user?.id || null });
      } catch (error) {
        return reject(error);
      }
    });
  }
}
