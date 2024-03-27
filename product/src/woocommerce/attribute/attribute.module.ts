import { Module } from '@nestjs/common';
import { AttributeService } from './services/attribute.service';
import { AttributeController } from './controllers/attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { AttributeWebhookService } from './services/attribute-webhook.service';
import { AttributeWebhookController } from './controllers/attribute-webhook.controller';
import { AttributeStagingService } from './services/attribute-staging.service';
import { AttributeProductionService } from './services/attribute-production.service';
import { AttributeStagingController } from './controllers/attribute-staging.controller';
import { AttributeProductionController } from './controllers/attribute-production.controller';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [AttributeService, AttributeWebhookService, AttributeStagingService, AttributeProductionService],
  controllers: [AttributeController, AttributeWebhookController, AttributeStagingController, AttributeProductionController],
  exports: [AttributeService, AttributeStagingService, AttributeProductionService],
})
export class AttributeModule {}
