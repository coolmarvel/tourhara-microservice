import { Module } from '@nestjs/common';
import { JfkService } from './services/jfk.service';
import { JfkController } from './controllers/jfk.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [JfkService],
  controllers: [JfkController],
  exports: [JfkService],
})
export class JfkModule {}
