import { Module } from '@nestjs/common';
import { LineItemService } from './services/line-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { LineItemStagingService } from './services/line-item-staging.service';
import { LineItemProductionService } from './services/line-item-production.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [LineItemService, LineItemStagingService, LineItemProductionService],
  exports: [LineItemService, LineItemStagingService, LineItemProductionService],
})
export class LineItemModule {}
