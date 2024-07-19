/**
 * 유저 인터페이스
 *
 * @author 이성현
 */
import { User } from '../entities/user.entity';

export interface IUserService {
  findAll(): Promise<User[]>;
}
