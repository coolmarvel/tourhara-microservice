import { BadRequestException, Injectable } from '@nestjs/common';
import { IAuthService, IRefreshResponse, ISigninResponse, ISignupResponse } from '../interfaces/auth.interface';
import { DataSource, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user.service';
import { RefreshToken } from '../entities/refresh-token.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    @InjectDataSource('staging') private dataSourceStag: DataSource,
    @InjectDataSource('production') private dataSourceProd: DataSource,
    @InjectRepository(RefreshToken, 'staging') private refreshTokenRepositoryStag: Repository<RefreshToken>,
    @InjectRepository(RefreshToken, 'production') private refreshTokenRepositoryProd: Repository<RefreshToken>,
  ) {}

  // STAGING
  async signup_stag(email: string, password: string): Promise<ISignupResponse> {
    const queryRunner = this.dataSourceStag.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let error: any;
    try {
      const user = await this.userService.findOneByEmail_stag(email);
      if (user) throw new BadRequestException();

      const newUserId = await this.userService.signup_stag(email, password);
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

  async signin_stag(email: string, password: string): Promise<ISigninResponse> {
    const userId = await this.userService.validateUser_stag(email, password);

    const refreshToken = this.generateRefreshToken(userId);
    await this.generateRefreshTokenUsingByUser_stag(userId, refreshToken); // TODO. STAG <=> PROD

    return { accessToken: this.generateAccessToken(userId), refreshToken };
  }

  async refresh_stag(token: string, userId: string): Promise<IRefreshResponse> {
    const refreshTokenEntity = await this.refreshTokenRepositoryStag.findOneBy({ token });
    if (!refreshTokenEntity) throw new BadRequestException();

    const accessToken = this.generateAccessToken(userId);
    const refreshToken = this.generateRefreshToken(userId);
    refreshTokenEntity.token = refreshToken;

    await this.refreshTokenRepositoryStag.save(refreshTokenEntity);

    return { accessToken, refreshToken };
  }

  // PRODUCTION
  async signup_prod(email: string, password: string): Promise<ISignupResponse> {
    const queryRunner = this.dataSourceProd.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let error: any;
    try {
      const user = await this.userService.findOneByEmail_prod(email);
      if (user) throw new BadRequestException();

      const newUserId = await this.userService.signup_prod(email, password);
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

  async signin_prod(email: string, password: string): Promise<ISigninResponse> {
    const userId = await this.userService.validateUser_prod(email, password);

    const refreshToken = this.generateRefreshToken(userId);
    await this.generateRefreshTokenUsingByUser_prod(userId, refreshToken); // TODO. STAG <=> PROD

    return { accessToken: this.generateAccessToken(userId), refreshToken };
  }

  async refresh_prod(token: string, userId: string): Promise<IRefreshResponse> {
    const refreshTokenEntity = await this.refreshTokenRepositoryProd.findOneBy({ token });
    if (!refreshTokenEntity) throw new BadRequestException();

    const accessToken = this.generateAccessToken(userId);
    const refreshToken = this.generateRefreshToken(userId);
    refreshTokenEntity.token = refreshToken;

    await this.refreshTokenRepositoryProd.save(refreshTokenEntity);

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

  async generateRefreshTokenUsingByUser_stag(userId: string, refreshToken: string): Promise<void> {
    let refreshTokenEntity = await this.refreshTokenRepositoryStag.findOneBy({ userId });
    if (refreshTokenEntity) refreshTokenEntity.token = refreshToken;
    else refreshTokenEntity = this.refreshTokenRepositoryStag.create({ userId, token: refreshToken });

    await this.refreshTokenRepositoryStag.save(refreshTokenEntity);
  }

  async generateRefreshTokenUsingByUser_prod(userId: string, refreshToken: string): Promise<void> {
    let refreshTokenEntity = await this.refreshTokenRepositoryProd.findOneBy({ userId });
    if (refreshTokenEntity) refreshTokenEntity.token = refreshToken;
    else refreshTokenEntity = this.refreshTokenRepositoryProd.create({ userId, token: refreshToken });

    await this.refreshTokenRepositoryProd.save(refreshTokenEntity);
  }
}
