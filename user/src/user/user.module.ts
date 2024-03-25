import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
