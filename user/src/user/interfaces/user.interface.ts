import { User } from '../entities';

/**
 * 유저 인터페이스
 *
 * @author 이성현
 */
export interface IUserService {
  getUsersAll(): Promise<User[]>;
}
