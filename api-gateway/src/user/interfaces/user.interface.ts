export interface IUserService {
  // STAING
  checkUserIsAdmin_stag(uuid: string): Promise<boolean>;

  findOneByEmail_stag(email: string): Promise<string>;

  signup_stag(email: string, password: string): Promise<string>;

  validateUser_stag(email: string, password: string): Promise<string>;

  // PRODUCTION
  checkUserIsAdmin_prod(uuid: string): Promise<boolean>;

  findOneByEmail_prod(email: string): Promise<string>;

  signup_prod(email: string, password: string): Promise<string>;

  validateUser_prod(email: string, password: string): Promise<string>;
}
