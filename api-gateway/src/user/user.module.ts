import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { UserService } from './services/user.service';
import { UserApiController } from './controllers/user-api.controller';
import { JwtService } from '@nestjs/jwt';
import { RoleApiController } from './controllers/role-api.controller';
import { RoleService } from './services/role.service';

/**
 * 유저 서비스 모듈
 *
 * @author 이성현
 */
@Module({
  providers: [
    {
      provide: 'USER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: { host: process.env.USER_HOST ?? 'localhost', port: parseInt(process.env.USER_PORT, 10) },
        });
      },
    },
    UserService,
    RoleService,
    JwtService,
  ],
  exports: [UserService, RoleService],
  controllers: [UserApiController, RoleApiController],
})
export class UserModule {}
