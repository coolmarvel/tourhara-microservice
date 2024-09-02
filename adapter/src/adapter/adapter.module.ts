import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import entities from './entities';
import { AdapterService } from './services';
import { AdapterController } from './controllers';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [AdapterService],
  controllers: [AdapterController],
})
export class AdapterModule {}
