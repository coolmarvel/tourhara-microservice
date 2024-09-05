import { SigninReqDto, SignupReqDto } from '../dtos/req.dto';

/**
 * Auth Interface
 *
 * @author 이성현
 */
export interface IAuthService {
  signin(reqDto: SigninReqDto): Promise<SigninResponse>;

  validateUserCredentials(reqDto: SigninReqDto): Promise<any>;

  generateRefreshToken(userId: string): string;

  generateRefreshTokenUsingByUser(userId: string, refreshToken: string): Promise<void>;

  generateAccessToken(userId: string): string;

  signup(reqDto: SignupReqDto): Promise<SignupResponse>;

  refresh(token: string, userId: string): Promise<RefreshResponse>;

  checkUserIsAdmin(uuid: string): Promise<boolean>;
}

export type SigninResponse = {
  userName: string;
  accessToken: string;
  refreshToken: string;
  sessionId: string;
};

export type SignupResponse = {
  id: string;
  accessToken: string;
  refreshToken: string;
};

export type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};
