/**
 * 유저 인터페이스
 *
 * @author 이성현
 */
import { UserResDto } from '../dtos';

export interface IUserService {
  getUsersAll(): Promise<UserResDto[]>;

  // TODO 하위 코드들은 사용하는 로직들인지 확인 필요
  checkUserIsAdmin(uuid: string): Promise<boolean>;

  findOneByEmail(email: string): Promise<string>;

  signup(email: string, password: string): Promise<string>;

  validateUser(email: string, password: string): Promise<string>;
}
