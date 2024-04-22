import { Controller } from '@nestjs/common';
import { UserStagingService } from '../../services/staging/user.staging.service';
import { MessagePattern } from '@nestjs/microservices';
import { CheckUserReqDto, FindUserReqDto, SignupReqDto, ValidateReqDto } from '../../dtos/req.dto';

@Controller()
export class UserStagingController {
  constructor(private readonly userService: UserStagingService) {}

  @MessagePattern({ cmd: 'checkUserIsAdmin_staging' })
  async checkUserIsAdmin({ uuid }: CheckUserReqDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await this.userService.checkUserIsAdmin(uuid));
      } catch (error) {
        return reject(error);
      }
    });
  }

  @MessagePattern({ cmd: 'signup_staging' })
  async signup({ email, password }: SignupReqDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await this.userService.signup(email, password));
      } catch (error) {
        return reject(error);
      }
    });
  }

  @MessagePattern({ cmd: 'validateUser_staging' })
  async validateUser({ email, password }: ValidateReqDto): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        return resolve(await this.userService.validateUser(email, password));
      } catch (error) {
        return reject(error);
      }
    });
  }

  @MessagePattern({ cmd: 'findOneByEmail_staging' })
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
