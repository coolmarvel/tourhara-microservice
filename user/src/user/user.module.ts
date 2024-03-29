import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { UserStagingService } from './services/user-staging.service';
import { UserProductionService } from './services/user-production.service';
import { UserStagingController } from './controllers/user-staging.controller';
import { UserProductionController } from './controllers/user-production.controller';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [UserStagingService, UserProductionService],
  controllers: [UserStagingController, UserProductionController],
})
export class UserModule {}
