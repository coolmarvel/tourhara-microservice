import { Injectable } from '@nestjs/common';
import { IJfkService } from 'src/order/interfaces/jfk.interface';
import { QueryRunner } from 'typeorm';
import { logger } from 'src/common/logger/logger.service';

@Injectable()
export class JfkStagingService implements IJfkService {
  insert(queryRunner: QueryRunner, jfkOneway: any, jfkShuttleRt: any, orderId: bigint): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingJfkOneway = await queryRunner.manager.query(`SELECT * FROM \`jfk_oneway\` WHERE order_id=?;`, [orderId]);
        const existingJfkShuttleRt = await queryRunner.manager.query(`SELECT * FROM \`jfk_shuttle_rt\` WHERE order_id=?;`, [orderId]);
        if (existingJfkOneway.length > 0 && existingJfkShuttleRt.length > 0) return resolve(true);

        await queryRunner.manager.query(
          `INSERT INTO \`jfk_oneway\` (
            jfk_shuttle_time,drop_add,jfk_shuttle_stop2,pickup_date_10,jfk_shuttle_date2,
            pickup_date_to_nj,jfk_shuttle_nj_date2,ewr_depart_date,kakao_id1,flight_num,
            ewr_flight_num,order_id,created_at,updated_at
          ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW());`,
          [
            jfkOneway.jfk_shuttle_time === '' ? null : jfkOneway.jfk_shuttle_time,
            jfkOneway.drop_add === '' ? null : jfkOneway.drop_add,
            jfkOneway.jfk_shuttle_stop2 === '' ? null : jfkOneway.jfk_shuttle_stop2,
            jfkOneway.pickup_date_10 === '' ? null : jfkOneway.pickup_date_10,
            jfkOneway.jfk_shuttle_date2 === '' ? null : jfkOneway.jfk_shuttle_date2,
            jfkOneway.pickup_date_to_nj === '' ? null : jfkOneway.pickup_date_to_nj,
            jfkOneway.jfk_shuttle_nj_date2 === '' ? null : jfkOneway.jfk_shuttle_nj_date2,
            jfkOneway.ewr_depart_date === '' ? null : jfkOneway.ewr_depart_date,
            jfkOneway.kakao_id1 === '' ? null : jfkOneway.kakao_id1,
            jfkOneway.flight_num === '' ? null : jfkOneway.flight_num,
            jfkOneway.ewr_flight_num === '' ? null : jfkOneway.ewr_flight_num,
            orderId,
          ],
        );

        await queryRunner.manager.query(
          `INSERT INTO \`jfk_shuttle_rt\` (
            jfk_shuttle_time2,drop_add_2,night_drop,pickup_date_30,
            pickup_date_night,pickup_date_fromnj,pickup_date_nj_night,ewr_arrive_date,
            kakao_id2,flight_num2,ewr_flght_num2,order_id,created_at,updated_at
          ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW());`,
          [
            jfkShuttleRt.jfk_shuttle_time2 === '' ? null : jfkShuttleRt.jfk_shuttle_time2,
            jfkShuttleRt.drop_add_2 === '' ? null : jfkShuttleRt.drop_add_2,
            jfkShuttleRt.night_drop === '' ? null : jfkShuttleRt.night_drop,
            jfkShuttleRt.pickup_date_30 === '' ? null : jfkShuttleRt.pickup_date_30,
            jfkShuttleRt.pickup_date_night === '' ? null : jfkShuttleRt.pickup_date_night,
            jfkShuttleRt.pickup_date_fromnj === '' ? null : jfkShuttleRt.pickup_date_fromnj,
            jfkShuttleRt.pickup_date_nj_night === '' ? null : jfkShuttleRt.pickup_date_nj_night,
            jfkShuttleRt.ewr_arrive_date === '' ? null : jfkShuttleRt.ewr_arrive_date,
            jfkShuttleRt.kakao_id2 === '' ? null : jfkShuttleRt.kakao_id2,
            jfkShuttleRt.flight_num2 === '' ? null : jfkShuttleRt.flight_num2,
            jfkShuttleRt.ewr_flght_num2 === '' ? null : jfkShuttleRt.ewr_flght_num2,
            orderId,
          ],
        );

        return resolve(true);
      } catch (error) {
        logger.error('Jfk Service Insert Error');
        logger.error(error);
        return reject(error);
      }
    });
  }

  update(queryRunner: QueryRunner, jfkOneway: any, jfkShuttleRt: any, orderId: bigint): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingJfkOneway = await queryRunner.manager.query(`SELECT * FROM \`jfk_oneway\` WHERE order_id=?;`, [orderId]);
        const existingJfkShuttleRt = await queryRunner.manager.query(`SELECT * FROM \`jfk_shuttle_rt\` WHERE order_id=?;`, [orderId]);
        if (existingJfkOneway.length === 0 && existingJfkShuttleRt.length === 0) return resolve(await this.insert(queryRunner, jfkOneway, jfkShuttleRt, orderId));

        await queryRunner.manager.query(
          `UPDATE \`jfk_oneway\` SET 
            jfk_shuttle_time=?,drop_add=?,jfk_shuttle_stop2=?,pickup_date_10=?,jfk_shuttle_date2=?,
            pickup_date_to_nj=?,jfk_shuttle_nj_date2=?,ewr_depart_date=?,kakao_id1=?,flight_num=?,
            ewr_flight_num=?,updated_at=NOW()
          WHERE order_id=?;`,
          [
            jfkOneway.jfk_shuttle_time === '' ? null : jfkOneway.jfk_shuttle_time,
            jfkOneway.drop_add === '' ? null : jfkOneway.drop_add,
            jfkOneway.jfk_shuttle_stop2 === '' ? null : jfkOneway.jfk_shuttle_stop2,
            jfkOneway.pickup_date_10 === '' ? null : jfkOneway.pickup_date_10,
            jfkOneway.jfk_shuttle_date2 === '' ? null : jfkOneway.jfk_shuttle_date2,
            jfkOneway.pickup_date_to_nj === '' ? null : jfkOneway.pickup_date_to_nj,
            jfkOneway.jfk_shuttle_nj_date2 === '' ? null : jfkOneway.jfk_shuttle_nj_date2,
            jfkOneway.ewr_depart_date === '' ? null : jfkOneway.ewr_depart_date,
            jfkOneway.kakao_id1 === '' ? null : jfkOneway.kakao_id1,
            jfkOneway.flight_num === '' ? null : jfkOneway.flight_num,
            jfkOneway.ewr_flight_num === '' ? null : jfkOneway.ewr_flight_num,
            orderId,
          ],
        );

        await queryRunner.manager.query(
          `UPDATE \`jfk_shuttle_rt\` SET 
            jfk_shuttle_time2=?,drop_add_2=?,night_drop=?,pickup_date_30=?,
            pickup_date_night=?,pickup_date_fromnj=?,pickup_date_nj_night=?,ewr_arrive_date=?,
            kakao_id2=?,flight_num2=?,ewr_flght_num2=?,updated_at=NOW()
          WHERE order_id=?;`,
          [
            jfkShuttleRt.jfk_shuttle_time2 === '' ? null : jfkShuttleRt.jfk_shuttle_time2,
            jfkShuttleRt.drop_add_2 === '' ? null : jfkShuttleRt.drop_add_2,
            jfkShuttleRt.night_drop === '' ? null : jfkShuttleRt.night_drop,
            jfkShuttleRt.pickup_date_30 === '' ? null : jfkShuttleRt.pickup_date_30,
            jfkShuttleRt.pickup_date_night === '' ? null : jfkShuttleRt.pickup_date_night,
            jfkShuttleRt.pickup_date_fromnj === '' ? null : jfkShuttleRt.pickup_date_fromnj,
            jfkShuttleRt.pickup_date_nj_night === '' ? null : jfkShuttleRt.pickup_date_nj_night,
            jfkShuttleRt.ewr_arrive_date === '' ? null : jfkShuttleRt.ewr_arrive_date,
            jfkShuttleRt.kakao_id2 === '' ? null : jfkShuttleRt.kakao_id2,
            jfkShuttleRt.flight_num2 === '' ? null : jfkShuttleRt.flight_num2,
            jfkShuttleRt.ewr_flght_num2 === '' ? null : jfkShuttleRt.ewr_flght_num2,
            orderId,
          ],
        );

        return resolve(true);
      } catch (error) {
        logger.error('Jfk Service Update Error');
        logger.error(error);
        return reject(error);
      }
    });
  }
}
