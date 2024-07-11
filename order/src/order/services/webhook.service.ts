import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

import { IWebhookService } from '../interfaces';
import {
  BillingService,
  GuestHouseService,
  H2oUsimService,
  JfkOnewayService,
  JfkShuttleRtService,
  LineItemMetadataService,
  LineItemService,
  OrderMetadataService,
  OrderService,
  PaymentService,
  ShippingService,
  SnapInfoService,
  TourInfoService,
  TourService,
  UsimInfoService,
} from '.';

@Injectable()
export default class WebhookService implements IWebhookService {
  constructor(
    private dataSource: DataSource,
    private readonly tourService: TourService,
    private readonly orderService: OrderService,
    private readonly billingService: BillingService,
    private readonly paymentService: PaymentService,
    private readonly h2oUsimService: H2oUsimService,
    private readonly shippingService: ShippingService,
    private readonly tourInfoService: TourInfoService,
    private readonly lineItemService: LineItemService,
    private readonly snapInfoService: SnapInfoService,
    private readonly usimInfoService: UsimInfoService,
    private readonly jfkOnewayService: JfkOnewayService,
    private readonly guestHouseService: GuestHouseService,
    private readonly jfkShuttleRtService: JfkShuttleRtService,
    private readonly orderMetadataService: OrderMetadataService,
    private readonly lineItemMetadataService: LineItemMetadataService,
  ) {}

  async orderCreated(payload: any): Promise<any> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      // billing
      const billing = payload?.billing;
      await this.billingService.insert(queryRunner, billing, payload.id);

      // shipping
      const shipping = payload?.shipping;
      await this.shippingService.insert(queryRunner, shipping, payload.id);

      // payment
      const payment = {
        paymentMethod: payload?.payment_method,
        paymentMethodTitle: payload?.payment_method_title,
        transactionId: payload?.transaction_id,
        paymentUrl: payload?.payment_url,
        needsPayment: payload?.needs_payment,
      };
      await this.paymentService.insert(queryRunner, payment, payload.id);

      // tour
      const tour = payload?.tour;
      await this.tourService.insert(queryRunner, tour, payload.id);

      // tour-info
      const tourInfo = payload?.tour_info;
      await this.tourInfoService.insert(queryRunner, tourInfo, payload.id);

      // snap-info
      const snapInfo = payload?.snap_info;
      await this.snapInfoService.insert(queryRunner, snapInfo, payload.id);

      // usim-info
      const usimInfo = payload?.usim_info;
      await this.usimInfoService.insert(queryRunner, usimInfo, payload.id);

      // h2o-usim
      const h2oUsim = payload?.h2ousim;
      await this.h2oUsimService.insert(queryRunner, h2oUsim, payload.id);

      // jfk-oneway
      const jfkOneway = payload?.jfk_oneway;
      await this.jfkOnewayService.insert(queryRunner, jfkOneway, payload.id);

      // jfk-shuttle-rt
      const jfkShuttleRt = payload?.jfk_shuttle_rt;
      await this.jfkShuttleRtService.insert(queryRunner, jfkShuttleRt, payload.id);

      // guest-house
      const guestHouse = payload?.guest_house;
      await this.guestHouseService.insert(queryRunner, guestHouse, payload.id);

      // order
      await this.orderService.insert(queryRunner, payload);

      // order-metadata
      const orderMetadatas = payload?.meta_data;
      for (const orderMetadata of orderMetadatas) {
        await this.orderMetadataService.insert(queryRunner, orderMetadata, payload.id);
      }

      // line-items
      const lineItems = payload?.line_items;
      for (const lineItem of lineItems) {
        await this.lineItemService.insert(queryRunner, lineItem, payload.id);

        // line-item-metadata
        const lineItemMetadatas = lineItem?.meta_data;
        for (const lineItemMetadata of lineItemMetadatas) {
          await this.lineItemMetadataService.insert(queryRunner, lineItemMetadata, lineItem.id);
        }
      }

      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async orderUpdated(payload: any): Promise<any> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      // billing
      const billing = payload?.billing;
      await this.billingService.update(queryRunner, billing, payload.id);

      // shipping
      const shipping = payload?.shipping;
      await this.shippingService.update(queryRunner, shipping, payload.id);

      // payment
      const payment = {
        paymentMethod: payload?.payment_method,
        paymentMethodTitle: payload?.payment_method_title,
        transactionId: payload?.transaction_id,
        paymentUrl: payload?.payment_url,
        needsPayment: payload?.needs_payment,
      };
      await this.paymentService.update(queryRunner, payment, payload.id);

      // tour
      const tour = payload?.tour;
      await this.tourService.update(queryRunner, tour, payload.id);

      // tour-info
      const tourInfo = payload?.tour_info;
      await this.tourInfoService.update(queryRunner, tourInfo, payload.id);

      // snap-info
      const snapInfo = payload?.snap_info;
      await this.snapInfoService.update(queryRunner, snapInfo, payload.id);

      // usim-info
      const usimInfo = payload?.usim_info;
      await this.usimInfoService.update(queryRunner, usimInfo, payload.id);

      // h2o-usim
      const h2oUsim = payload?.h2ousim;
      await this.h2oUsimService.update(queryRunner, h2oUsim, payload.id);

      // jfk-oneway
      const jfkOneway = payload?.jfk_oneway;
      await this.jfkOnewayService.update(queryRunner, jfkOneway, payload.id);

      // jfk-shuttle-rt
      const jfkShuttleRt = payload?.jfk_shuttle_rt;
      await this.jfkShuttleRtService.update(queryRunner, jfkShuttleRt, payload.id);

      // guest-house
      const guestHouse = payload?.guest_house;
      await this.guestHouseService.update(queryRunner, guestHouse, payload.id);

      // order
      await this.orderService.update(queryRunner, payload);

      // order-metadata
      const orderMetadatas = payload?.meta_data;
      for (const orderMetadata of orderMetadatas) {
        await this.orderMetadataService.update(queryRunner, orderMetadata, payload.id);
      }

      // line-items
      const lineItems = payload?.line_items;
      for (const lineItem of lineItems) {
        await this.lineItemService.update(queryRunner, lineItem, payload.id);

        // line-item-metadata
        const lineItemMetadatas = lineItem?.meta_data;
        for (const lineItemMetadata of lineItemMetadatas) {
          await this.lineItemMetadataService.update(queryRunner, lineItemMetadata, lineItem.id);
        }
      }

      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async orderDeleted(payload: any): Promise<any> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }

  async orderRestored(payload: any): Promise<any> {
    try {
      return true;
    } catch (error) {
      throw error;
    }
  }
}
