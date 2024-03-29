import { Controller } from '@nestjs/common';
import { OrderProductionService } from '../services/order-production.service';

@Controller()
export class OrderProductionController {
  constructor(private readonly orderProductionService: OrderProductionService) {}
}
