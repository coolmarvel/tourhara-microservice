import { Injectable } from '@nestjs/common';
import { IAuthService, RefreshResponse, SigninResponse, SignupResponse } from '../interfaces/auth.interface';

@Injectable()
export class AuthProductionService implements IAuthService {
  async signup(email: string, password: string): Promise<SignupResponse> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }

  async signin(email: string, password: string): Promise<SigninResponse> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }

  async refresh(token: string, userId: string): Promise<RefreshResponse> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }

  async generateAccessToken(userId: string): string {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }

  async generateRefreshToken(userId: string): string {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }

  async generateRefreshTokenUsingByUser(userId: string, refreshToken: string): Promise<void> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }
}
