import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  providers: [
    UserService,
    {
      provide: 'USER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: { host: process.env.USER_DOCKER_FLAG === 'true' ? process.env.USER_DOCKER_HOST : 'localhost', port: Number(process.env.USER_DOCKER_PORT) },
        });
      },
    },
  ],
  exports: [UserService],
})
export class UserModule {}
