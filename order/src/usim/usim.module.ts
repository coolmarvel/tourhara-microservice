import { Module } from '@nestjs/common';
import { UsimService } from './services/usim.service';
import { UsimController } from './controllers/usim.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [UsimService],
  controllers: [UsimController],
})
export class UsimModule {}
