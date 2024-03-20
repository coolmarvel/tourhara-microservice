import { Injectable } from '@nestjs/common';
import { IShippingService } from '../interfaces/shipping.interface';

@Injectable()
export class ShippingService implements IShippingService {}
