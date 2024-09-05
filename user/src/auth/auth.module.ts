import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthMapper } from './mappers/auth.mapper';
import { AuthRepository } from './repositories/auth.repository';
import { UserModule } from '../user/user.module';
import { SessionService } from './services/session.service';
import { SessionController } from './controllers/session.controller';

/**
 * Auth 모듈
 *
 * @author 김이안
 */
@Module({
  imports: [UserModule],
  providers: [AuthService, AuthMapper, AuthRepository, SessionService],
  controllers: [AuthController, SessionController],
})
export class AuthModule {}
