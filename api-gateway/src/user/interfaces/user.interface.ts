/**
 * 유저 인터페이스
 *
 * @author 이성현
 */
import { UserResDto } from '../dtos/user.dto';

export interface IUserService {
  checkUserIsAdmin(uuid: string): Promise<boolean>;

  findOneByEmail(email: string): Promise<string>;

  signup(email: string, password: string): Promise<string>;

  validateUser(email: string, password: string): Promise<string>;

  getUsersAll(): Promise<UserResDto[]>;
}
