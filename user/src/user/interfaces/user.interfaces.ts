import { User } from '../entities/user.entity';

export interface IUserService {
  // STAGING
  checkUserIsAdmin_stag(uuid: string): Promise<{ isAdmin: boolean }>;

  signup_stag(email: string, password: string): Promise<{ id: string }>;

  validateUser_stag(email: string, password: string): Promise<{ id: string }>;

  findOneByEmail_stag(email: string): Promise<User>;

  // PRODUCTION
  checkUserIsAdmin_prod(uuid: string): Promise<{ isAdmin: boolean }>;

  signup_prod(email: string, password: string): Promise<{ id: string }>;

  validateUser_prod(email: string, password: string): Promise<{ id: string }>;

  findOneByEmail_prod(email: string, password: string): Promise<User>;
}
