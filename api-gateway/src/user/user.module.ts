/**
 * 유저 서비스 모듈
 *
 * @author 이성현
 */
import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { UserService } from './services/user.service';
import { UserApiController } from './controllers/userApiController';

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
  ],
  exports: [UserService],
  controllers: [UserApiController],
})
export class UserModule {}
