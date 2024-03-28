import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { CategoryStagingService } from './services/category-staging.service';
import { CategoryProductionService } from './services/category-production.service';
import { CategoryStagingController } from './controllers/category_staging.controller';
import { CategoryProductionController } from './controllers/category-production.controller';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [CategoryStagingService, CategoryProductionService],
  controllers: [CategoryStagingController, CategoryProductionController],
  exports: [CategoryStagingService, CategoryProductionService],
})
export class CategoryModule {}
