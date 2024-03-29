import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { AttributeStagingService } from './services/attribute-staging.service';
import { AttributeProductionService } from './services/attribute-production.service';
import { AttributeStagingController } from './controllers/attribute-staging.controller';
import { AttributeProductionController } from './controllers/attribute-production.controller';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [AttributeStagingService, AttributeProductionService],
  controllers: [AttributeStagingController, AttributeProductionController],
  exports: [AttributeStagingService, AttributeProductionService],
})
export class AttributeModule {}
