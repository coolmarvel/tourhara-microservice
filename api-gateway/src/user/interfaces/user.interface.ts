export interface IUserService {
  checkUserIsAdmin(uuid: string): Promise<boolean>;

  findOneByEmail(email: string): Promise<string>;

  signup(email: string, password: string): Promise<string>;

  validateUser(email: string, password): Promise<string>;
}
