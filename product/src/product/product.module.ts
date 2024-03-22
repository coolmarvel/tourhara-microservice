import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { ProductWebhookService } from './services/product-webhook.service';
import { ProductWebhookController } from './controllers/product-webhook.controller';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [ProductService, ProductWebhookService],
  controllers: [ProductController, ProductWebhookController],
})
export class ProductModule {}
