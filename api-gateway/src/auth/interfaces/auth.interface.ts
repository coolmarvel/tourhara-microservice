export interface IAuthService {
  signup(email: string, password: string): Promise<ISignupResponse>;

  signin(email: string, password: string): Promise<ISigninResponse>;

  refresh(token: string, userId: string): Promise<IRefreshResponse>;

  generateAccessToken(userId: string): string;

  generateRefreshToken(userId: string): string;

  generateRefreshTokenUsingByUser(userId: string, refreshToken: string): Promise<void>;
}

export interface ISignupResponse {
  id: string;
  accessToken: string;
  refreshToken: string;
}

export interface ISigninResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshResponse {
  accessToken: string;
  refreshToken: string;
}
