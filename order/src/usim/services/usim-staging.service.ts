import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { SnapInfo } from '../entities/snap-info.entity';
import { UsimInfo } from '../entities/usim-info.entity';
import { H2ousim } from '../entities/h2ousim.entity';
import { IUsimService } from '../interfaces/usim.interface';

@Injectable()
export class UsimStagingService implements IUsimService {
  async insert(queryRunner: QueryRunner, snapInfo: any, usimInfo: any, h2ousim: any, orderId: any): Promise<any> {
    try {
      const existingOrderSnapInfo = await queryRunner.manager.findOne(SnapInfo, { where: { orderId: orderId } });
      const existingOrderUsimInfo = await queryRunner.manager.findOne(UsimInfo, { where: { orderId: orderId } });
      const existingOrderH2ousim = await queryRunner.manager.findOne(H2ousim, { where: { orderId: orderId } });

      if (existingOrderSnapInfo && existingOrderUsimInfo && existingOrderH2ousim) return true;

      const newOrderSnapInfo = {
        mobileSnap: snapInfo.snap_info == '' ? null : snapInfo.snap_info,
        orderId: orderId,
      };
      const orderSnapInfo = queryRunner.manager.create(SnapInfo, newOrderSnapInfo);
      await queryRunner.manager.save(orderSnapInfo);

      const newOrderUsimInfo = {
        deliveryOption2: usimInfo.delivery_option2 == '' ? null : usimInfo.delivery_option2,
        departureDate2: usimInfo.departure_date2 == '' ? null : usimInfo.departure_date2,
        attTMobileDate: usimInfo.att_tmobile_date == '' ? null : usimInfo.att_tmobile_date,
        usimName: usimInfo.usim_name == '' ? null : usimInfo.usim_name,
        usimAddress1: usimInfo.usim_address_1 == '' ? null : usimInfo.usim_address_1,
        usimAddress2: usimInfo.usim_address_2 == '' ? null : usimInfo.usim_address_2,
        usimPostcode: usimInfo.usim_postcode == '' ? null : usimInfo.usim_postcode,
        esimDevice: usimInfo.esim_device == '' ? null : usimInfo.esim_device,
        esimEid: usimInfo.esim_eid == '' ? null : usimInfo.esim_eid,
        esimImei: usimInfo.esim_imei == '' ? null : usimInfo.esim_imei,
        noticeCheckSimcard: usimInfo.notice_check_simcard == '' ? null : usimInfo.notice_check_simcard,
        orderId: orderId,
      };
      const orderUsimInfoEntity = queryRunner.manager.create(UsimInfo, newOrderUsimInfo);
      await queryRunner.manager.save(orderUsimInfoEntity);

      const newOrderH2ousim = {
        usimExtension: h2ousim.usim_extension == '' ? null : h2ousim.usim_extension,
        eidNumber: h2ousim.eid_number == '' ? null : h2ousim.eid_number,
        previousOrderNumber: h2ousim.previous_order_number == '' ? null : h2ousim.previous_order_number,
        orderId: orderId,
      };
      const orderH2ousimEntity = queryRunner.manager.create(H2ousim, newOrderH2ousim);
      await queryRunner.manager.save(orderH2ousimEntity);

      return true;
    } catch (error) {
      console.error('usim, snap, h2ousim insert error');
      throw error;
    }
  }
}
