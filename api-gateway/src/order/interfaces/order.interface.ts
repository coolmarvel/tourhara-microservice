import { CreateOrderReqDto } from '../dtos/req.dto';

export interface IOrderService {
  createAnOrder_stag(data: CreateOrderReqDto): Promise<any>;

  retrieveAnOrder_stag(order_id: string): Promise<any>;

  listAllOrders_stag(page: number, size: number): Promise<any>;

  updateAnOrder_stag(order_id: string, data: any): Promise<any>;

  deleteAnOrder_stag(order_id: string): Promise<any>;

  createAnOrder_prod(data: CreateOrderReqDto): Promise<any>;

  retrieveAnOrder_prod(order_id: string): Promise<any>;

  listAllOrders_prod(page: number, size: number): Promise<any>;

  updateAnOrder_prod(order_id: string, data: any): Promise<any>;

  deleteAnOrder_prod(order_id: string): Promise<any>;
}
