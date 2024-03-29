import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { JfkOneway } from '../entities/jfk-oneway.entity';
import { JfkShuttleRt } from '../entities/jfk-shuttle-rt.entity';
import { IJfkService } from '../interfaces/jfk.interface';

@Injectable()
export class JfkProductionService implements IJfkService {
  async insert(queryRunner: QueryRunner, jfkOneway: any, jfkShuttleRt: any, orderId: string): Promise<any> {
    try {
      const existingOrderJfkOneway = await queryRunner.manager.findOne(JfkOneway, { where: { orderId: orderId } });
      const existingOrderJfkShuttleRt = await queryRunner.manager.findOne(JfkShuttleRt, { where: { orderId: orderId } });
      if (existingOrderJfkOneway && existingOrderJfkShuttleRt) return true;

      const newOrderJfkOneway = {
        jfkShuttleTime: jfkOneway.jfk_shuttle_time === '' ? null : jfkOneway.jfk_shuttle_time,
        dropAdd: jfkOneway.drop_add === '' ? null : jfkOneway.drop_add,
        jfkShuttleStop2: jfkOneway.jfk_shuttle_stop2 === '' ? null : jfkOneway.jfk_shuttle_stop2,
        pickup_date_10: jfkOneway.pickup_date_10 === '' ? null : jfkOneway.pickup_date_10,
        jfkShuttleDate2: jfkOneway.jfk_shuttle_date2 === '' ? null : jfkOneway.jfk_shuttle_date2,
        pickupDateToNj: jfkOneway.pickup_date_to_nj === '' ? null : jfkOneway.pickup_date_to_nj,
        jfkShuttleNjDate2: jfkOneway.jfk_shuttle_nj_date2 === '' ? null : jfkOneway.jfk_shuttle_nj_date2,
        ewrDepartDate: jfkOneway.ewr_depart_date === '' ? null : jfkOneway.ewr_depart_date,
        kakaoId1: jfkOneway.kakao_id1 === '' ? null : jfkOneway.kakao_id1,
        flightNum: jfkOneway.flight_num === '' ? null : jfkOneway.flight_num,
        ewrFlightNum: jfkOneway.ewr_flight_num === '' ? null : jfkOneway.ewr_flight_num,
        orderId: orderId,
      };
      const orderJfkOnewayEntity = queryRunner.manager.create(JfkOneway, newOrderJfkOneway);
      await queryRunner.manager.save(orderJfkOnewayEntity);

      const newOrderJfkShuttleRt = {
        jfkShuttleTime2: jfkShuttleRt.jfk_shuttle_time2 === '' ? null : jfkShuttleRt.jfk_shuttle_time2,
        dropAdd2: jfkShuttleRt.drop_add_2 === '' ? null : jfkShuttleRt.drop_add_2,
        nightDrop: jfkShuttleRt.night_drop === '' ? null : jfkShuttleRt.night_drop,
        pickupDate30: jfkShuttleRt.pickup_date_30 === '' ? null : jfkShuttleRt.pickup_date_30,
        pickupDateNight: jfkShuttleRt.pickup_date_night === '' ? null : jfkShuttleRt.pickup_date_night,
        pickupDateFromNj: jfkShuttleRt.pickup_date_fromnj === '' ? null : jfkShuttleRt.pickup_date_fromnj,
        pickupDateNjNight: jfkShuttleRt.pickup_date_nj_night === '' ? null : jfkShuttleRt.pickup_date_nj_night,
        ewrArriveDate: jfkShuttleRt.ewr_arrive_date === '' ? null : jfkShuttleRt.ewr_arrive_date,
        kakaoId2: jfkShuttleRt.kakao_id2 === '' ? null : jfkShuttleRt.kakao_id2,
        flighNum2: jfkShuttleRt.flight_num2 === '' ? null : jfkShuttleRt.flight_num2,
        ewrFlightNum2: jfkShuttleRt.ewr_flght_num2 === '' ? null : jfkShuttleRt.ewr_flght_num2,
        orderId: orderId,
      };
      const orderJfkShuttleRtEntity = queryRunner.manager.create(JfkShuttleRt, newOrderJfkShuttleRt);
      await queryRunner.manager.save(orderJfkShuttleRtEntity);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
