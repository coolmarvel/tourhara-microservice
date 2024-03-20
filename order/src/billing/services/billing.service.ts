import { Injectable } from '@nestjs/common';
import { IBillingService } from '../interfaces/billing.interface';

@Injectable()
export class BillingService implements IBillingService {}
