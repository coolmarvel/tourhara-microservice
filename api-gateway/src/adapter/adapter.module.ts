import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AdapterStagingService } from './services/staging/adapter.staging.service';
import { AdapterStagingController } from './controllers/staging/adapter.staging.controller';
import { AdapterProductionController } from './controllers/production/adapter.production.controller';
import { AdapterProductionService } from './services/production/adapter.production.service';

@Module({
  imports: [],
  providers: [
    AdapterStagingService,
    AdapterProductionService,
    {
      provide: 'ADAPTER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: { host: process.env.ADAPTER_DOCKER_FLAG === 'true' ? process.env.ADAPTER_DOCKER_HOST : 'localhost', port: Number(process.env.ADAPTER_DOCKER_PORT) },
        });
      },
    },
  ],
  controllers: [AdapterStagingController, AdapterProductionController],
})
export class AdapterModule {}
