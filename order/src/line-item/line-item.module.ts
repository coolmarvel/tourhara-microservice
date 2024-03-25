import { Module } from '@nestjs/common';
import { LineItemService } from './services/line-item.service';
import { LineItemController } from './controllers/line-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [LineItemService],
  controllers: [LineItemController],
})
export class LineItemModule {}
