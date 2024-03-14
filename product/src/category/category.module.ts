import { Module } from '@nestjs/common';
import { CategoryService } from './services/category.service';

@Module({
  providers: [CategoryService]
})
export class CategoryModule {}
