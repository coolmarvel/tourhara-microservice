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
import { UserService } from '../user/services/user.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { SessionController } from './controllers/session.controller';
import { SessionService } from './services/session.service';

/**
 * 인증 모듈
 * - Passport 와 JWT 설정
 *
 * @author 이성현
 */
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
  providers: [
    AuthService,
    UserService,
    SessionService,
    JwtAuthStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    {
      provide: 'USER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: { host: process.env.USER_HOST ?? 'localhost', port: parseInt(process.env.USER_PORT, 10) },
        });
      },
    },
  ],
  controllers: [AuthController, SessionController],
})
export class AuthModule {}
