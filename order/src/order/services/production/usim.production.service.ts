import { Injectable } from '@nestjs/common';
import { IUsimService } from 'src/order/interfaces/usim.interface';
import { QueryRunner } from 'typeorm';
import { logger } from 'src/common/logger/logger.service';

@Injectable()
export class UsimProductionService implements IUsimService {
  insert(queryRunner: QueryRunner, snapInfo: any, usimInfo: any, h2ousim: any, orderId: bigint): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingSnapInfo = await queryRunner.manager.query(`SELECT * FROM \`snap_info\` WHERE order_id=?;`, [orderId]);
        const existingUsimInfo = await queryRunner.manager.query(`SELECT * FROM \`usim_info\` WHERE order_id=?;`, [orderId]);
        const existingH2ousim = await queryRunner.manager.query(`SELECT * FROM \`h2ousim\` WHERE order_id=?;`, [orderId]);
        if (existingH2ousim.length > 0 && existingUsimInfo.length > 0 && existingSnapInfo.length > 0) return resolve(true);

        await queryRunner.manager.query(
          `INSERT INTO \`snap_info\` (
            mobile_snap,order_id,created_at,updated_at
          ) VALUES (?,?,NOW(),NOW());`,
          [snapInfo.mobile_snap === '' ? null : snapInfo.mobile_snap, orderId],
        );

        await queryRunner.manager.query(
          `INSERT INTO \`usim_info\` (
            delivery_option2,departure_date2,att_tmobile_date,usim_name,
            usim_address_1,usim_address_2,usim_postcode,esim_device,esim_eid,
            esim_imei,notice_check_simcard,order_id,created_at,updated_at
          ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW());`,
          [
            usimInfo.delivery_option2 === '' ? null : usimInfo.delivery_option2,
            usimInfo.departure_date2 === '' ? null : usimInfo.departure_date2,
            usimInfo.att_tmobile_date === '' ? null : usimInfo.att_tmobile_date,
            usimInfo.usim_name === '' ? null : usimInfo.usim_name,
            usimInfo.usim_address_1 === '' ? null : usimInfo.usim_address_1,
            usimInfo.usim_address_2 === '' ? null : usimInfo.usim_address_2,
            usimInfo.usim_postcode === '' ? null : usimInfo.usim_postcode,
            usimInfo.esim_device === '' ? null : usimInfo.esim_device,
            usimInfo.esim_eid === '' ? null : usimInfo.esim_eid,
            usimInfo.esim_imei === '' ? null : usimInfo.esim_imei,
            usimInfo.notice_check_simcard === '' ? null : usimInfo.notice_check_simcard,
            orderId,
          ],
        );

        await queryRunner.manager.query(
          `INSERT INTO \`h2ousim\` (
            usim_extension,eid_number,previous_order_number,order_id,created_at,updated_at
          ) VALUES (?,?,?,?,NOW(),NOW());`,
          [
            h2ousim.usim_extension === '' ? null : h2ousim.usim_extension,
            h2ousim.eid_number === '' ? null : h2ousim.eid_number,
            h2ousim.previous_order_number === '' ? null : h2ousim.previous_order_number,
            orderId,
          ],
        );

        return resolve(true);
      } catch (error) {
        logger.error('Usim Service Insert Error');
        logger.error(error);
        return reject(error);
      }
    });
  }

  update(queryRunner: QueryRunner, snapInfo: any, usimInfo: any, h2ousim: any, orderId: bigint): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingSnapInfo = await queryRunner.manager.query(`SELECT * FROM \`snap_info\` WHERE order_id=?;`, [orderId]);
        const existingUsimInfo = await queryRunner.manager.query(`SELECT * FROM \`usim_info\` WHERE order_id=?;`, [orderId]);
        const existingH2ousim = await queryRunner.manager.query(`SELECT * FROM \`h2ousim\` WHERE order_id=?;`, [orderId]);
        if (existingH2ousim.length === 0 && existingUsimInfo.length === 0 && existingSnapInfo.length === 0) return resolve(await this.insert(queryRunner, snapInfo, usimInfo, h2ousim, orderId));

        await queryRunner.manager.query(
          `UPDATE \`snap_info\` SET 
            mobile_snap=?,updated_at=NOW()
          WHERE order_id=?;`,
          [snapInfo.mobile_snap === '' ? null : snapInfo.mobile_snap, orderId],
        );

        await queryRunner.manager.query(
          `UPDATE \`usim_info\` SET 
            delivery_option2=?,departure_date2=?,att_tmobile_date=?,usim_name=?,usim_address_1=?,
            usim_address_2=?,usim_postcode=?,esim_device=?,esim_eid=?,esim_imei=?,
            notice_check_simcard=?,updated_at=NOW()
          WHERE order_id=?;`,
          [
            usimInfo.delivery_option2 === '' ? null : usimInfo.delivery_option2,
            usimInfo.departure_date2 === '' ? null : usimInfo.departure_date2,
            usimInfo.att_tmobile_date === '' ? null : usimInfo.att_tmobile_date,
            usimInfo.usim_name === '' ? null : usimInfo.usim_name,
            usimInfo.usim_address_1 === '' ? null : usimInfo.usim_address_1,
            usimInfo.usim_address_2 === '' ? null : usimInfo.usim_address_2,
            usimInfo.usim_postcode === '' ? null : usimInfo.usim_postcode,
            usimInfo.esim_device === '' ? null : usimInfo.esim_device,
            usimInfo.esim_eid === '' ? null : usimInfo.esim_eid,
            usimInfo.esim_imei === '' ? null : usimInfo.esim_imei,
            usimInfo.notice_check_simcard === '' ? null : usimInfo.notice_check_simcard,
            orderId,
          ],
        );

        await queryRunner.manager.query(
          `UPDATE \`h2ousim\` SET 
            usim_extension=?,eid_number=?,previous_order_number=?,updated_at=NOW()
          WHERE order_id=?;`,
          [
            h2ousim.usim_extension === '' ? null : h2ousim.usim_extension,
            h2ousim.eid_number === '' ? null : h2ousim.eid_number,
            h2ousim.previous_order_number === '' ? null : h2ousim.previous_order_number,
            orderId,
          ],
        );

        return resolve(true);
      } catch (error) {
        logger.error('Usim Service Update Error');
        logger.error(error);
        return reject(error);
      }
    });
  }
}
