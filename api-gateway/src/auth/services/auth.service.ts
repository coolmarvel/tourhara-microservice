import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { IAuthService, RefreshResponse, SigninResponse, SignupResponse } from '../interfaces/auth.interface';
import { ClientProxy } from '@nestjs/microservices';
import { RefreshToken } from '../entities/refresh-token.entity';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../user/services/user.service';
import { SigninReqDto, SignupReqDto } from '../dtos/req.dto';
import { MeResDto } from '../dtos/res.dto';
import { v4 as uuidv4 } from 'uuid';

/**
 * Auth Service
 *
 * @author 이성현
 */
@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly client: ClientProxy,
    private jwtService: JwtService,
    private userService: UserService,
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(RefreshToken) private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  /**
   * 유저 검증
   *
   * @param reqDto
   */
  async signin(reqDto: SigninReqDto): Promise<SigninResponse> {
    try {
      const validateUser = await this.validateUserCredentials(reqDto);
      const validateUserId = validateUser.userId;

      const refreshToken = this.generateRefreshToken(validateUserId);

      await this.generateRefreshTokenUsingByUser(validateUserId, refreshToken);

      const accessToken = this.generateAccessToken(validateUserId);

      const sessionId = this.generateSessionId();

      return {
        userName: validateUser.userName,
        accessToken,
        refreshToken,
        sessionId,
      };
    } catch (error) {
      console.error('Signin failed:', error);
      throw new Error('Signin failed'); // Customize this message or use a custom error class
    }
  }

  /**
   * 유저 유효성 검증
   *
   * @param reqDto
   */
  async validateUserCredentials(reqDto: SigninReqDto): Promise<any> {
    try {
      const pattern = { cmd: 'validateUserCredentials' };
      const payload = reqDto;

      return await firstValueFrom(this.client.send(pattern, payload));
    } catch (e) {
      throw new Error(e.message);
    }
  }

  /**
   * Refresh 토큰 발급
   *
   * @param userId
   */
  generateRefreshToken(userId: string): string {
    const payload = { sub: userId, tokenType: 'refresh' };

    return this.jwtService.sign(payload, { expiresIn: '30d' });
  }

  /**
   * userId로 Refresh 토큰을 생성하거나 업데이트
   *
   * @param userId
   * @param refreshToken
   */
  async generateRefreshTokenUsingByUser(userId: string, refreshToken: string): Promise<void> {
    try {
      let refreshTokenEntity = await this.refreshTokenRepository.findOneBy({ userId });
      if (refreshTokenEntity) {
        refreshTokenEntity.token = refreshToken;
      } else {
        refreshTokenEntity = this.refreshTokenRepository.create({ userId, token: refreshToken });
      }

      await this.refreshTokenRepository.save(refreshTokenEntity);
    } catch (error) {
      console.error('Error generating refresh token:', error);
      throw new Error('Failed to save refresh token'); // Customize or handle this error
    }
  }

  /**
   * Access 토큰 생성
   *
   * @param userId
   */
  generateAccessToken(userId: string): string {
    const payload = { sub: userId, tokenType: 'access' };

    return this.jwtService.sign(payload, { expiresIn: '1d' });
  }

  /**
   * 회원 가입
   *
   * @param reqDto
   */
  async signup(reqDto: SignupReqDto): Promise<SignupResponse> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const user = await this.userService.findOneByUserId(reqDto.userId);
      if (user !== null) throw new BadRequestException('이미 등록된 유저입니다.');

      const newUserId = await this.userService.signup(reqDto);
      const accessToken = this.generateAccessToken(newUserId);
      const refreshTokenEntity = queryRunner.manager.create(RefreshToken, {
        userId: newUserId,
        token: this.generateRefreshToken(newUserId),
      });

      await queryRunner.manager.save(refreshTokenEntity);
      await queryRunner.commitTransaction();

      return { id: newUserId, accessToken, refreshToken: refreshTokenEntity.token };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async refresh(token: string, userId: string): Promise<RefreshResponse> {
    const refreshTokenEntity = await this.refreshTokenRepository.findOneBy({ token });
    if (!refreshTokenEntity) throw new BadRequestException();

    const accessToken = this.generateAccessToken(userId);
    const refreshToken = this.generateRefreshToken(userId);
    refreshTokenEntity.token = refreshToken;

    await this.refreshTokenRepository.save(refreshTokenEntity);

    return { accessToken, refreshToken };
  }

  async checkUserIsAdmin(uuid: string): Promise<boolean> {
    try {
      const pattern = { cmd: 'checkUserIsAdmin' };
      const payload = { uuid };
      const { isAdmin } = await firstValueFrom<{ isAdmin: boolean }>(
        this.client.send<{
          isAdmin: boolean;
        }>(pattern, payload),
      );

      return isAdmin;
    } catch (error) {
      throw error;
    }
  }

  /**
   * sessionId 생성
   *
   * @private
   */
  private generateSessionId() {
    return uuidv4();
  }
}
