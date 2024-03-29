import { Injectable } from '@nestjs/common';
import { IBillingService } from '../interfaces/billing.interface';
import { Billing } from '../entities/billing.entity';
import { QueryRunner } from 'typeorm';

@Injectable()
export class BillingService implements IBillingService {
  async saveBilling_prod(queryRunner: QueryRunner, orderId: string, billing: any): Promise<any> {
    try {
      await queryRunner.startTransaction();

      const existingOrderBilling = await queryRunner.manager.findOne(Billing, { where: { orderId: orderId } });
      if (existingOrderBilling) return true;

      const newOrderBilling = {
        firstName: billing.first_name == '' ? null : billing.first_name,
        lastName: billing.last_name == '' ? null : billing.last_name,
        company: billing.company == '' ? null : billing.company,
        address1: billing.address_1 == '' ? null : billing.address_1,
        address2: billing.address_2 == '' ? null : billing.address_2,
        city: billing.city == '' ? null : billing.city,
        state: billing.state == '' ? null : billing.state,
        postcode: billing.postcode == '' ? null : billing.postcode,
        country: billing.country == '' ? null : billing.country,
        email: billing.email == '' ? null : billing.email,
        phone: billing.phone == '' ? null : billing.phone,
        survey: billing.survey == '' ? null : billing.survey,
        orderId: orderId,
      };
      const orderBillingEntitiy = queryRunner.manager.create(Billing, newOrderBilling);
      await queryRunner.manager.save(orderBillingEntitiy);

      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }
}
