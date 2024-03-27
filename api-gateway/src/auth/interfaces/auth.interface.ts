export interface IAuthService {
  signup_stag(email: string, password: string): Promise<ISignupResponse>;

  signin_stag(email: string, password: string): Promise<ISigninResponse>;

  refresh_stag(token: string, userId: string): Promise<IRefreshResponse>;

  generateAccessToken(userId: string): string;

  generateRefreshToken(userId: string): string;

  generateRefreshTokenUsingByUser_stag(userId: string, refreshToken: string): Promise<void>;

  signup_prod(email: string, password: string): Promise<ISignupResponse>;

  signin_prod(email: string, password: string): Promise<ISigninResponse>;

  refresh_prod(token: string, userId: string): Promise<IRefreshResponse>;

  generateRefreshTokenUsingByUser_prod(userId: string, refreshToken: string): Promise<void>;
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
