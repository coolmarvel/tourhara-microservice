import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { AdapterService } from './services/adapter.service';
import { AdapterController } from './controllers/adapter.controller';

@Module({
  imports: [],
  providers: [
    AdapterService,
    {
      provide: 'ADAPTER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({ transport: Transport.TCP, options: { host: process.env.ADAPTER_HOST ?? 'localhost', port: parseInt(process.env.ADAPTER_PORT, 10) } });
      },
    },
  ],
  controllers: [AdapterController],
})
export class AdapterModule {}
