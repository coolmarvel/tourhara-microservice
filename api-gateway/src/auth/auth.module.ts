import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthStrategy } from './guards/jwt-auth.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import entities from './entities';
import { AuthStagingService } from './services/auth-staging.service';
import { AuthProductionService } from './services/auth-production.service';
import { AuthStagingController } from './controllers/auth-staging.controller';
import { AuthProductionController } from './controllers/auth-production.controller';

@Module({
  imports: [
    UserModule,
    PassportModule,
    TypeOrmModule.forFeature(entities, 'staging'),
    TypeOrmModule.forFeature(entities, 'production'),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return { global: true, secret: configService.get('auth.secret'), signOptions: { expiresIn: '1d' } };
      },
    }),
  ],
  providers: [AuthStagingService, AuthProductionService, JwtAuthStrategy, { provide: APP_GUARD, useClass: JwtAuthGuard }],
  controllers: [AuthStagingController, AuthProductionController],
})
export class AuthModule {}
