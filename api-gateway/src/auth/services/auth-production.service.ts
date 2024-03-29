import { BadRequestException, Injectable } from '@nestjs/common';
import { IAuthService, RefreshResponse, SigninResponse, SignupResponse } from '../interfaces/auth.interface';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { DataSource, Repository } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token.entity';
import { UserProductionService } from 'src/user/services/user-production.service';

@Injectable()
export class AuthProductionService implements IAuthService {
  constructor(
    private jwtService: JwtService,
    private userProductionService: UserProductionService,
    @InjectDataSource('production') private dataSource: DataSource,
    @InjectRepository(RefreshToken, 'production') private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async signup(email: string, password: string): Promise<SignupResponse> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const user = await this.userProductionService.findOneByEmail(email);
      if (user) throw new BadRequestException();

      const newUserId = await this.userProductionService.signup(email, password);
      const accessToken = this.generateAccessToken(newUserId);
      const refreshTokenEntity = queryRunner.manager.create(RefreshToken, { userId: newUserId, token: this.generateRefreshToken(newUserId) });
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

  async signin(email: string, password: string): Promise<SigninResponse> {
    try {
      const userId = await this.userProductionService.validateUser(email, password);

      const refreshToken = this.generateRefreshToken(userId);
      await this.generateRefreshTokenUsingByUser(userId, refreshToken);

      return { accessToken: this.generateAccessToken(userId), refreshToken };
    } catch (error) {
      throw error;
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

  generateAccessToken(userId: string): string {
    const payload = { sub: userId, tokenType: 'access' };

    return this.jwtService.sign(payload, { expiresIn: '1d' });
  }

  generateRefreshToken(userId: string): string {
    const payload = { sub: userId, tokenType: 'refresh' };

    return this.jwtService.sign(payload, { expiresIn: '30d' });
  }

  async generateRefreshTokenUsingByUser(userId: string, refreshToken: string): Promise<void> {
    let refreshTokenEntity = await this.refreshTokenRepository.findOneBy({ userId });
    if (refreshTokenEntity) refreshTokenEntity.token = refreshToken;
    else refreshTokenEntity = this.refreshTokenRepository.create({ userId, token: refreshToken });

    await this.refreshTokenRepository.save(refreshTokenEntity);
  }
}
