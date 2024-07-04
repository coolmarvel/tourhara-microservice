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

@Module({
  imports: [
    UserModule,
    PassportModule,
    TypeOrmModule.forFeature(entities),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return { global: true, secret: configService.get('auth.secret'), signOptions: { expiresIn: '1d' } };
      },
    }),
  ],
  providers: [AuthService, JwtAuthStrategy, { provide: APP_GUARD, useClass: JwtAuthGuard }],
  controllers: [AuthController],
})
export class AuthModule {}
