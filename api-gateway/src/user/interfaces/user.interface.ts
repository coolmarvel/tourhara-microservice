/**
 * 유저 관리 인터페이스
 *
 * @author 이성현
 */
import { UserResDto } from '../dtos';
import { SignupReqDto } from '../../auth/dtos/req.dto';

export interface IUserService {
  getUsersAll(): Promise<UserResDto[]>;

  findOneByUserId(email: string): Promise<string>;

  signup(reqDto: SignupReqDto): Promise<string>;
}
