import { IAuthService } from '../interfaces/auth.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthReqDto, AuthResDto, UserResDto } from '../dtos/auth.dto';
import { AuthRepository } from '../repositories/auth.repository';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../user/services';
import { CreateUserReqDto } from '../dtos/user.dto';

/**
 * 권한 관련 서비스
 *
 * @author 김이안
 */
@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private authRepository: AuthRepository,
    private userService: UserService,
  ) {}

  /**
   * 사용자 유효성 검증
   *
   * @param reqDto
   */
  async validateUserCredentials(reqDto: AuthReqDto): Promise<AuthResDto> {
    try {
      const foundUser = await this.findOneByUserId(reqDto.userId);
      if (!foundUser) throw new UnauthorizedException();

      const passwordIsValid = await bcrypt.compare(reqDto.password, foundUser.password);
      if (!passwordIsValid) throw new UnauthorizedException();

      return UserResDto.toAuthResDto(foundUser);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * userId로 유저 찾기
   *
   * @param userId
   */
  async findOneByUserId(userId: string): Promise<UserResDto> {
    return await this.authRepository.findOneByUserId(userId);
  }

  /**
   * 회원가입
   *
   * @param reqDto
   */
  async signup(reqDto: CreateUserReqDto): Promise<string> {
    try {
      const salt = await bcrypt.genSalt();
      reqDto.password = await bcrypt.hash(reqDto.password, salt);
      return await this.userService.insertUser(reqDto);
    } catch (error) {
      throw error;
    }
  }

  // TODO 해당 부분 권한 적용 작업 시 수정이 필요한 부분이기 때문에 주석 처리
  // async checkUserIsAdmin(uuid: string): Promise<{ isAdmin: boolean }> {
  //   try {
  //     const user = await this.authRepository.findOneBy({ id: uuid });
  //
  //     return { isAdmin: user.role === Role.Admin };
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
