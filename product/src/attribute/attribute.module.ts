import { Module } from '@nestjs/common';
import { AttributeService } from './services/attribute.service';
import { AttributeController } from './controllers/attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { AttributeWebhookService } from './services/attribute-webhook.service';
import { AttributeWebhookController } from './controllers/attribute-webhook.controller';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [AttributeService, AttributeWebhookService],
  controllers: [AttributeController, AttributeWebhookController],
  exports: [AttributeService],
})
export class AttributeModule {}
