export interface IAuthService {
  signup(email: string, password: string): Promise<SignupResponse>;

  signin(email: string, password: string): Promise<SigninResponse>;

  refresh(token: string, userId: string): Promise<RefreshResponse>;

  generateAccessToken(userId: string): string;

  generateRefreshToken(userId: string): string;

  generateRefreshTokenUsingByUser(userId: string, refreshToken: string): Promise<void>;
}

export type SignupResponse = {
  id: string;
  accessToken: string;
  refreshToken: string;
};

export type SigninResponse = {
  accessToken: string;
  refreshToken: string;
};

export type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};
