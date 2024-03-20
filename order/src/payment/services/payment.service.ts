import { Injectable } from '@nestjs/common';
import { IPaymentService } from '../interfaces/payment.interface';

@Injectable()
export class PaymentService implements IPaymentService {}
