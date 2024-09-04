import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthReqDto, AuthResDto } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';
import { FindUserReqDto, CreateUserReqDto } from '../dtos/user.dto';

/**
 * 권한 Controller
 *
 * @author 김이안
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 유저 유효성 검증
   *
   * @param reqDto
   */
  @MessagePattern({ cmd: 'validateUserCredentials' })
  async validateUserCredentials(reqDto: AuthReqDto): Promise<AuthResDto> {
    return this.authService.validateUserCredentials(reqDto);
  }

  /**
   * userId로 유저 조회
   *
   * @param email
   */
  @MessagePattern({ cmd: 'findOneByUserId' })
  async findOneByEmail({ userId }: FindUserReqDto): Promise<any> {
    try {
      const user = await this.authService.findOneByUserId(userId);

      return { id: user?.userId || null };
    } catch (error) {
      throw error;
    }
  }

  /**
   * 회원가입
   *
   * @param reqDto
   */
  @MessagePattern({ cmd: 'signup' })
  async signup(reqDto: CreateUserReqDto): Promise<string> {
    try {
      return await this.authService.signup(reqDto);
    } catch (error) {
      throw error;
    }
  }

  // TODO 해당 부분 권한 적용 작업 시 수정이 필요한 부분이기 때문에 주석 처리
  // @MessagePattern({ cmd: 'checkUserIsAdmin' })
  // async checkUserIsAdmin({ uuid }: CheckUserReqDto): Promise<any> {
  //   try {
  //     return await this.authService.checkUserIsAdmin(uuid);
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
