import { BadRequestException, Injectable } from '@nestjs/common';
import { IAuthService, IRefreshResponse, ISigninResponse, ISignupResponse } from '../interfaces/auth.interface';
import { DataSource, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RefreshToken } from '../entities/refresh-token.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
    private userService: UserService,
    @InjectRepository(RefreshToken) private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async signup(email: string, password: string): Promise<ISignupResponse> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let error: any;
    try {
      const user = await this.userService.findOneByEmail(email);
      if (user) throw new BadRequestException();

      const newUserId = await this.userService.signup(email, password);
      const accessToken = this.generateAccessToken(newUserId);
      const refreshTokenEntity = queryRunner.manager.create(RefreshToken, { userId: newUserId, token: this.generateRefreshToken(newUserId) });
      queryRunner.manager.save(refreshTokenEntity);
      await queryRunner.commitTransaction();

      return { id: newUserId, accessToken, refreshToken: refreshTokenEntity.token };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      error = e;
    } finally {
      await queryRunner.release();

      if (error) throw error;
    }
  }

  async signin(email: string, password: string): Promise<ISigninResponse> {
    const userId = await this.userService.validateUser(email, password);

    const refreshToken = this.generateRefreshToken(userId);
    await this.generateRefreshTokenUsingByUser(userId, refreshToken);

    return { accessToken: this.generateAccessToken(userId), refreshToken };
  }

  async refresh(token: string, userId: string): Promise<IRefreshResponse> {
    const refreshTokenEntity = await this.refreshTokenRepository.findOneBy({ userId });
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
