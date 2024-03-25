import { Module } from '@nestjs/common';
import { ShippingService } from './services/shipping.service';
import { ShippingController } from './controllers/shipping.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities, 'staging'), TypeOrmModule.forFeature(entities, 'production')],
  providers: [ShippingService],
  controllers: [ShippingController],
  exports: [ShippingService],
})
export class ShippingModule {}
