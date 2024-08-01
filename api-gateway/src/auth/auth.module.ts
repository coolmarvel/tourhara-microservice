/**
 * 인증 모듈
 * - Passport와 JWT 설정
 *
 * @author 이성현
 */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import entities from './entities';
import { UserModule } from '../user/user.module';
import { AuthService } from './services/auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtAuthStrategy } from './guards/jwt-auth.strategy';
import { AuthController } from './controllers/auth.controller';

// PassportModule.register({ defaultStrategy: 'jwt' }),
@Module({
  imports: [
    UserModule,
    PassportModule,
    TypeOrmModule.forFeature(entities),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return { global: true, secret: configService.get('auth.secret'), signOptions: { expiresIn: '60m' } };
      },
    }),
  ],
  providers: [AuthService, JwtAuthStrategy, { provide: APP_GUARD, useClass: JwtAuthGuard }],
  controllers: [AuthController],
})
export class AuthModule {}
