import { Injectable } from '@nestjs/common';
import { ICouponLineService } from '../interfaces/coupon-line.interface';

@Injectable()
export class CouponLineService implements ICouponLineService {}
