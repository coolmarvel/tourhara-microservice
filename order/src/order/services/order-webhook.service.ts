// import { Injectable } from '@nestjs/common';
// import { IOrderWebhookService } from '../interfaces/order-webhook.interface';
// import { OrderService } from './order.service';

// @Injectable()
// export class OrderWebhookService implements IOrderWebhookService {
//   constructor(private readonly orderService: OrderService) {}

//   async orderCreated_stag(payload: any): Promise<any> {
//     console.log(payload);

//     return true;
//   }

//   async orderUpdated_stag(payload: any): Promise<any> {
//     console.log(payload);

//     return true;
//   }

//   async orderDeleted_stag(payload: any): Promise<any> {
//     console.log(payload);

//     return true;
//   }

//   async orderRestored_stag(payload: any): Promise<any> {
//     console.log(payload);

//     return true;
//   }

//   async orderCreated_prod(payload: any): Promise<any> {
//     console.log(payload);

//     return true;
//   }

//   async orderUpdated_prod(payload: any): Promise<any> {
//     console.log(payload);

//     return true;
//   }

//   async orderDeleted_prod(payload: any): Promise<any> {
//     console.log(payload);

//     return true;
//   }

//   async orderRestored_prod(payload: any): Promise<any> {
//     console.log(payload);

//     return true;
//   }
// }
