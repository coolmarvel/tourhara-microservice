import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import entities from './entities';
import { RestApiController, WebhookController } from './controllers';
import { AttributeService, CategoryImageService, CategoryService, ProductImageService, ProductService, RestApiService, TagService, WebhookService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [RestApiController, WebhookController],
  providers: [TagService, AttributeService, CategoryImageService, CategoryService, ProductImageService, ProductService, RestApiService, WebhookService],
})
export class ProductModule {}
