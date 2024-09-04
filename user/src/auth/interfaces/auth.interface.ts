import { AuthReqDto, AuthResDto, UserResDto } from '../dtos/auth.dto';
import { CreateUserReqDto } from '../dtos/user.dto';

/**
 * 권한 관련 인터페이스
 *
 * @author 김이안
 */
export interface IAuthService {
  validateUserCredentials(reqDto: AuthReqDto): Promise<AuthResDto>;

  findOneByUserId(userId: string): Promise<UserResDto>;

  signup(reqDto: CreateUserReqDto): Promise<string>;

  // TODO 해당 부분 권한 적용 작업 시 수정이 필요한 부분이기 때문에 주석 처리
  // checkUserIsAdmin(uuid: string): Promise<{ isAdmin: boolean }>;
}
