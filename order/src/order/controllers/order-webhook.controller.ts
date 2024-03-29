// import { Controller, VERSION_NEUTRAL } from '@nestjs/common';
// import { OrderWebhookService } from '../services/order-webhook.service';
// import { MessagePattern } from '@nestjs/microservices';

// @Controller({ path: 'order-webhook', version: VERSION_NEUTRAL })
// export class OrderWebhookController {
//   constructor(private readonly orderWebhookService: OrderWebhookService) {}

//   @MessagePattern({ cmd: 'orderCreated_stag' })
//   async orderCreated_stag(payload: any) {
//     return await this.orderWebhookService.orderCreated_stag(payload);
//   }

//   @MessagePattern({ cmd: 'orderUpdated_stag' })
//   async orderUpdated_stag(payload: any) {
//     return await this.orderWebhookService.orderUpdated_stag(payload);
//   }

//   @MessagePattern({ cmd: 'orderDeleted_stag' })
//   async orderDeleted_stag(payload: any) {
//     return await this.orderWebhookService.orderDeleted_stag(payload);
//   }

//   @MessagePattern({ cmd: 'orderRestored_stag' })
//   async orderRestored_stag(payload: any) {
//     return await this.orderWebhookService.orderRestored_stag(payload);
//   }

//   @MessagePattern({ cmd: 'orderCreated_prod' })
//   async orderCreated_prod(payload: any) {
//     return await this.orderWebhookService.orderCreated_prod(payload);
//   }

//   @MessagePattern({ cmd: 'orderUpdated_prod' })
//   async orderUpdated_prod(payload: any) {
//     return await this.orderWebhookService.orderUpdated_prod(payload);
//   }

//   @MessagePattern({ cmd: 'orderDeleted_prod' })
//   async orderDeleted_prod(payload: any) {
//     return await this.orderWebhookService.orderDeleted_prod(payload);
//   }

//   @MessagePattern({ cmd: 'orderRestored_prod' })
//   async orderRestored_prod(payload: any) {
//     return await this.orderWebhookService.orderRestored_prod(payload);
//   }
// }
