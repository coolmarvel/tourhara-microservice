import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { UserService } from './services/user.service';

@Module({
  providers: [
    {
      provide: 'USER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({ transport: Transport.TCP, options: { host: process.env.USER_HOST ?? 'localhost', port: parseInt(process.env.USER_PORT, 10) } });
      },
    },
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
