import { Module } from '@nestjs/common';
import { CouponLineService } from './services/coupon-line.service';
import { CouponLineController } from './controllers/coupon-line.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [CouponLineService],
  controllers: [CouponLineController],
})
export class CouponLineModule {}
