import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import entities from './entities';
import { AdapterService, OrderService } from './services';
import { AdapterController, OrderController } from './controllers';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [AdapterService, OrderService],
  controllers: [AdapterController, OrderController],
})
export class AdapterModule {}
