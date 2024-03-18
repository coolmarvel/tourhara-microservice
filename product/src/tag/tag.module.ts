import { Module } from '@nestjs/common';
import { TagService } from './services/tag.service';
import { TagController } from './controllers/tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [TagService],
  controllers: [TagController],
})
export class TagModule {}
