import { Injectable } from '@nestjs/common';
import { IShippingService } from '../interfaces/shipping.interface';
import { QueryRunner } from 'typeorm';
import { Shipping } from '../entities/shipping.entity';

@Injectable()
export class ShippingService implements IShippingService {
  async saveShipping_prod(queryRunner: QueryRunner, orderId: string, shipping: any): Promise<any> {
    try {
      await queryRunner.startTransaction();

      const existingOrderShipping = await queryRunner.manager.findOne(Shipping, { where: { orderId: orderId } });
      if (existingOrderShipping) return true;

      const newOrderShipping = {
        firstName: shipping.first_name == '' ? null : shipping.first_name,
        lastName: shipping.last_name == '' ? null : shipping.last_name,
        company: shipping.company == '' ? null : shipping.company,
        address1: shipping.address_1 == '' ? null : shipping.address_1,
        address2: shipping.address_2 == '' ? null : shipping.address_2,
        city: shipping.city == '' ? null : shipping.city,
        state: shipping.state == '' ? null : shipping.state,
        postcode: shipping.postcode == '' ? null : shipping.postcode,
        country: shipping.country == '' ? null : shipping.country,
        phone: shipping.phone == '' ? null : shipping.phone,
        shippingMobile: shipping.shipping_mobile == '' ? null : shipping.shippingMobile,
        orderId: orderId,
      };
      const orderShippingEntity = queryRunner.manager.create(Shipping, newOrderShipping);
      await queryRunner.manager.save(orderShippingEntity);

      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }
}
