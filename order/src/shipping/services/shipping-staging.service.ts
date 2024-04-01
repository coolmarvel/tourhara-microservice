import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { Shipping } from '../entities/shipping.entity';
import { IShippingService } from '../interfaces/shipping.interface';

@Injectable()
export default class ShippingStagingService implements IShippingService {
  async insert(queryRunner: QueryRunner, shipping: any, orderId: string): Promise<any> {
    try {
      const existingOrderShipping = await queryRunner.manager.findOne(Shipping, { where: { orderId: orderId } });
      if (existingOrderShipping) return true;

      const newOrderShipping = {
        firstName: shipping.first_name === '' ? null : shipping.first_name,
        lastName: shipping.last_name === '' ? null : shipping.last_name,
        company: shipping.company === '' ? null : shipping.company,
        address1: shipping.address_1 === '' ? null : shipping.address_1,
        address2: shipping.address_2 === '' ? null : shipping.address_2,
        city: shipping.city === '' ? null : shipping.city,
        state: shipping.state === '' ? null : shipping.state,
        postcode: shipping.postcode === '' ? null : shipping.postcode,
        country: shipping.country === '' ? null : shipping.country,
        phone: shipping.phone === '' ? null : shipping.phone,
        shippingMobile: shipping.shipping_mobile === '' ? null : shipping.shippingMobile,
        orderId: orderId,
      };
      const orderShippingEntity = queryRunner.manager.create(Shipping, newOrderShipping);
      await queryRunner.manager.save(orderShippingEntity);

      return true;
    } catch (error) {
      console.error('shipping insert error');
      throw error;
    }
  }
}
