import { Injectable } from '@nestjs/common';
import { ITourService } from 'src/order/interfaces/tour.interface';
import { QueryRunner } from 'typeorm';
import { logger } from 'src/common/logger/logger.service';

@Injectable()
export class TourProductionService implements ITourService {
  async insert(queryRunner: QueryRunner, tour: any, tourInfo: any, orderId: bigint): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingTour = await queryRunner.manager.query(
          `SELECT * FROM \`tour\` 
          WHERE order_id=?;`,
          [orderId],
        );
        const existingTourInfo = await queryRunner.manager.query(
          `SELECT * FROM \`tour_info\` 
          WHERE order_id=?;`,
          [orderId],
        );
        if (existingTour.length > 0 && existingTourInfo.length > 0) return resolve(true);

        await queryRunner.manager.query(
          `INSERT INTO \`tour\` (
            top_date,top_sunset,tor_time_2,date_summit,summit_daytime_time,summit_night_date,summit_night_time,
            summ_time_2,summ_dec_date,summ_dec_time_2,date_911,time_911,date_911_2,time_911_2,empire_date,empire_time,
            oneworld_date,oneworld_time,wollman_date,wollman_high_date,wollman_time,wollman_time_2,yankees_name,
            ellis_island_date,guggen_notice,order_id,created_at,updated_at
          ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW());`,
          [
            tour.top_date === '' ? null : tour.top_date,
            tour.top_sunset === '' ? null : tour.top_sunset,
            tour.tor_time_2 === '' ? null : tour.tor_time_2,
            tour.date_summit === '' ? null : tour.date_summit,
            tour.summit_daytime_time === '' ? null : tour.summit_daytime_time,
            tour.summit_night_date === '' ? null : tour.summit_night_date,
            tour.summit_night_time === '' ? null : tour.summit_night_time,
            tour.summ_time_2 === '' ? null : tour.summ_time_2,
            tour.summ_dec_date === '' ? null : tour.summ_dec_date,
            tour.summ_dec_time_2 === '' ? null : tour.summ_dec_time_2,
            tour.date_911 === '' ? null : tour.date_911,
            tour.time_911 === '' ? null : tour.time_911,
            tour.date_911_2 === '' ? null : tour.date_911_2,
            tour.time_911_2 === '' ? null : tour.time_911_2,
            tour.empire_date === '' ? null : tour.empire_date,
            tour.empire_time === '' ? null : tour.empire_time,
            tour.oneworld_date === '' ? null : tour.oneworld_date,
            tour.oneworld_time === '' ? null : tour.oneworld_time,
            tour.wollman_date === '' ? null : tour.wollman_date,
            tour.wollman_high_date === '' ? null : tour.wollman_high_date,
            tour.wollman_time === '' ? null : tour.wollman_time,
            tour.wollman_time_2 === '' ? null : tour.wollman_time_2,
            tour.yankees_name === '' ? null : tour.yankees_name,
            tour.ellis_island_date === '' ? null : tour.ellis_island_date,
            tour.guggen_notice === '' ? null : tour.guggen_notice,
            orderId,
          ],
        );

        await queryRunner.manager.query(
          `INSERT INTO \`tour_info\` (
            whitney_date,whitney_time,guggen_date,guggen_time,un_name,tour_kakaoid,
            airport_pickup_time,address,address_to,flight_info,contact_info,order_id,created_at,updated_at
          ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW());`,
          [
            tourInfo.whitney_date === '' ? null : tourInfo.whitney_date,
            tourInfo.whitney_time === '' ? null : tourInfo.whitney_time,
            tourInfo.guggen_date === '' ? null : tourInfo.guggen_date,
            tourInfo.guggen_time === '' ? null : tourInfo.guggen_time,
            tourInfo.un_name === '' ? null : tourInfo.un_name,
            tourInfo.tour_kakakoid === '' ? null : tourInfo.tour_kakakoid,
            tourInfo.airport_pickup_time === '' ? null : tourInfo.airport_pickup_time,
            tourInfo.address === '' ? null : tourInfo.address,
            tourInfo.address_to === '' ? null : tourInfo.address_to,
            tourInfo.flight_info === '' ? null : tourInfo.flight_info,
            tourInfo.contact_info === '' ? null : tourInfo.contact_info,
            orderId,
          ],
        );

        return resolve(true);
      } catch (error) {
        logger.error('Tour Service Insert Error');
        logger.error(error);
        return reject(error);
      }
    });
  }

  async update(queryRunner: QueryRunner, tour: any, tourInfo: any, orderId: bigint): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const existingTour = await queryRunner.manager.query(
          `SELECT * FROM \`tour\` 
          WHERE order_id=?;`,
          [orderId],
        );
        const existingTourInfo = await queryRunner.manager.query(
          `SELECT * FROM \`tour_info\` 
          WHERE order_id=?;`,
          [orderId],
        );
        if (existingTour.length === 0 && existingTourInfo.length === 0) return resolve(await this.insert(queryRunner, tour, tourInfo, orderId));

        await queryRunner.manager.query(
          `UPDATE \`tour\` SET 
            top_date=?,top_sunset=?,tor_time_2=?,date_summit=?,summit_daytime_time=?,summit_night_date=?,
            summit_night_time=?,summ_time_2=?,summ_dec_date=?,summ_dec_time_2=?,date_911=?,time_911=?,
            date_911_2=?,time_911_2=?,empire_date=?,empire_time=?,oneworld_date=?,oneworld_time=?,
            wollman_date=?,wollman_high_date=?,wollman_time=?,wollman_time_2=?,yankees_name=?,
            ellis_island_date=?,guggen_notice=?,updated_at=NOW()
          WHERE order_id=?;`,
          [
            tour.top_date === '' ? null : tour.top_date,
            tour.top_sunset === '' ? null : tour.top_sunset,
            tour.tor_time_2 === '' ? null : tour.tor_time_2,
            tour.date_summit === '' ? null : tour.date_summit,
            tour.summit_daytime_time === '' ? null : tour.summit_daytime_time,
            tour.summit_night_date === '' ? null : tour.summit_night_date,
            tour.summit_night_time === '' ? null : tour.summit_night_time,
            tour.summ_time_2 === '' ? null : tour.summ_time_2,
            tour.summ_dec_date === '' ? null : tour.summ_dec_date,
            tour.summ_dec_time_2 === '' ? null : tour.summ_dec_time_2,
            tour.date_911 === '' ? null : tour.date_911,
            tour.time_911 === '' ? null : tour.time_911,
            tour.date_911_2 === '' ? null : tour.date_911_2,
            tour.time_911_2 === '' ? null : tour.time_911_2,
            tour.empire_date === '' ? null : tour.empire_date,
            tour.empire_time === '' ? null : tour.empire_time,
            tour.oneworld_date === '' ? null : tour.oneworld_date,
            tour.oneworld_time === '' ? null : tour.oneworld_time,
            tour.wollman_date === '' ? null : tour.wollman_date,
            tour.wollman_high_date === '' ? null : tour.wollman_high_date,
            tour.wollman_time === '' ? null : tour.wollman_time,
            tour.wollman_time_2 === '' ? null : tour.wollman_time_2,
            tour.yankees_name === '' ? null : tour.yankees_name,
            tour.ellis_island_date === '' ? null : tour.ellis_island_date,
            tour.guggen_notice === '' ? null : tour.guggen_notice,
            orderId,
          ],
        );

        await queryRunner.manager.query(
          `UPDATE \`tour_info\` SET 
            whitney_date=?,whitney_time=?,guggen_date=?,guggen_time=?,un_name=?,tour_kakaoid=?,
            airport_pickup_time=?,address=?,address_to=?,flight_info=?,contact_info=?,updated_at=NOW()
          WHERE order_id=?;`,
          [
            tourInfo.whitney_date === '' ? null : tourInfo.whitney_date,
            tourInfo.whitney_time === '' ? null : tourInfo.whitney_time,
            tourInfo.guggen_date === '' ? null : tourInfo.guggen_date,
            tourInfo.guggen_time === '' ? null : tourInfo.guggen_time,
            tourInfo.un_name === '' ? null : tourInfo.un_name,
            tourInfo.tour_kakakoid === '' ? null : tourInfo.tour_kakakoid,
            tourInfo.airport_pickup_time === '' ? null : tourInfo.airport_pickup_time,
            tourInfo.address === '' ? null : tourInfo.address,
            tourInfo.address_to === '' ? null : tourInfo.address_to,
            tourInfo.flight_info === '' ? null : tourInfo.flight_info,
            tourInfo.contact_info === '' ? null : tourInfo.contact_info,
            orderId,
          ],
        );

        return resolve(true);
      } catch (error) {
        logger.error('Tour Service Update Error');
        logger.error(error);
        return reject(error);
      }
    });
  }
}
