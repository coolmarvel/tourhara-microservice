import { Controller } from '@nestjs/common';
import { OrderStagingService } from '../services/order-staging.service';

@Controller()
export class OrderStagingController {
  constructor(private readonly orderStagingService: OrderStagingService) {}
}
