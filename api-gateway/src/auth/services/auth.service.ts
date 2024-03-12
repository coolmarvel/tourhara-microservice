import { Injectable } from '@nestjs/common';
import { IAuthService, IRefreshResponse, ISigninResponse, ISignupResponse } from '../interfaces/auth.interface';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string): Promise<ISignupResponse> {
    throw new Error('Method not implemented.');
  }

  async signin(email: string, password: string): Promise<ISigninResponse> {
    throw new Error('Method not implemented.');
  }

  async refresh(token: string, userId: string): Promise<IRefreshResponse> {
    throw new Error('Method not implemented.');
  }

  async generateAccessToken(userId: string): Promise<string> {
    const payload = { sub: userId, tokenType: 'access' };

    return this.jwtService.sign(payload, { expiresIn: '1d' });
  }

  async generateRefreshToken(userId: string): Promise<string> {
    const payload = { sub: userId, tokenType: 'refresh' };

    return this.jwtService.sign(payload, { expiresIn: '30d' });
  }

  async generateRefreshTokenUsingByUser(userId: string, refreshToken: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
