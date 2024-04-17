import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AttributeStagingService } from './services/staging/attribute.staging.service';
import { CategoryStagingService } from './services/staging/category.staging.service';
import { ProductStagingService } from './services/staging/product.staging.service';
import { TagStagingService } from './services/staging/tag.staging.service';
import { AttributeProductionService } from './services/production/attribute.production.service';
import { CategoryProductionService } from './services/production/category.production.service';
import { ProductProductionService } from './services/production/product.production.service';
import { TagProductionService } from './services/production/tag.production.service';
import { AttributeStagingController } from './controllers/staging/attribute.staging.controller';
import { CategoryStagingController } from './controllers/staging/category.staging.controller';
import { ProductStagingController } from './controllers/staging/product.staging.controller';
import { TagStagingController } from './controllers/staging/tag.staging.controller';
import { AttributeProductionController } from './controllers/production/attribute.production.controller';
import { CategoryProductionController } from './controllers/production/category.production.controller';
import { ProductProductionController } from './controllers/production/product.production.controller';
import { TagProductionController } from './controllers/production/tag.production.controller';

@Module({
  providers: [
    {
      provide: 'PRODUCT_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: { host: process.env.PRODUCT_DOCKER_FLAG === 'true' ? process.env.PRODUCT_DOCKER_HOST : 'localhost', port: Number(process.env.PRODUCT_DOCKER_PORT) },
        });
      },
    },
    // Staging
    AttributeStagingService,
    CategoryStagingService,
    ProductStagingService,
    TagStagingService,
    // Production
    AttributeProductionService,
    CategoryProductionService,
    ProductProductionService,
    TagProductionService,
  ],
  controllers: [
    // Staging
    ProductStagingController,
    CategoryStagingController,
    AttributeStagingController,
    TagStagingController,
    // Production
    ProductProductionController,
    CategoryProductionController,
    AttributeProductionController,
    TagProductionController,
  ],
})
export class ProductModule {}
