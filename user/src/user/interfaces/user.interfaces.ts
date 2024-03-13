import { User } from '../entities/user.entity';

export interface IUserService {
  checkUserIsAdmin(uuid: string): Promise<{ isAdmin: boolean }>;

  signup(email: string, password: string): Promise<{ id: string }>;

  validateUser(email: string, password: string): Promise<{ id: string }>;

  findOneByEmail(email: string): Promise<User>;
}
