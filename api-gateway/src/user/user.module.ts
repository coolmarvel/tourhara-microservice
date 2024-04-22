import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserStagingService } from './services/staging/user.staging.service';
import { UserProductionService } from './services/production/user.production.service';

@Module({
  providers: [
    {
      provide: 'USER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: { host: process.env.USER_DOCKER_FLAG === 'true' ? process.env.USER_DOCKER_HOST : 'localhost', port: Number(process.env.USER_DOCKER_PORT) },
        });
      },
    },
    UserStagingService,
    UserProductionService,
  ],
  exports: [UserStagingService, UserProductionService],
})
export class UserModule {}
