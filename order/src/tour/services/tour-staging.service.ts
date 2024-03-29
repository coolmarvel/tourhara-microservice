import { Injectable } from '@nestjs/common';
import { ITourStagingService } from '../interfaces/tour-staging.interface';
import { QueryRunner } from 'typeorm';
import { Tour } from '../entities/tour.entity';
import { TourInfo } from '../entities/tour-info.entity';

@Injectable()
export class TourStagingService implements ITourStagingService {
  async insert(queryRunner: QueryRunner, tour: any, tourInfo: any, orderId: string): Promise<any> {
    try {
      const existingOrderTour = await queryRunner.manager.findOne(Tour, { where: { orderId: orderId } });
      const existingOrderTourInfo = await queryRunner.manager.findOne(TourInfo, { where: { orderId: orderId } });
      if (existingOrderTour && existingOrderTourInfo) return true;

      const newOrderTour = {
        topDate: tour.top_date === '' ? null : tour.top_date,
        topSunset: tour.top_sunset === '' ? null : tour.top_sunset,
        torTime2: tour.tor_time_2 === '' ? null : tour.tor_time_2,
        dateSummit: tour.date_summit === '' ? null : tour.date_summit,
        summitDaytimeTime: tour.summit_daytime_time === '' ? null : tour.summit_daytime_time,
        summitNightDate: tour.summit_night_date === '' ? null : tour.summit_night_date,
        summitNightTime: tour.summit_night_time === '' ? null : tour.summit_night_time,
        summTime2: tour.summ_time_2 === '' ? null : tour.summ_time_2,
        summDecDate: tour.summ_dec_date === '' ? null : tour.summ_dec_date,
        summDecTime2: tour.summ_dec_time_2 === '' ? null : tour.summ_dec_time_2,
        date911: tour.date_911 === '' ? null : tour.date_911,
        time911: tour.time_911 === '' ? null : tour.time_911,
        date911_2: tour.date_911_2 === '' ? null : tour.date_911_2,
        time911_2: tour.time_911_2 === '' ? null : tour.time_911_2,
        empireDate: tour.empire_date === '' ? null : tour.empire_date,
        empireTime: tour.empire_time === '' ? null : tour.empire_time,
        oneworldDate: tour.oneworld_date === '' ? null : tour.oneworld_date,
        oneworldTime: tour.oneworld_time === '' ? null : tour.oneworld_time,
        wollmanDate: tour.wollman_date === '' ? null : tour.wollman_date,
        wollmanHighDate: tour.wollman_high_date === '' ? null : tour.wollman_high_date,
        wollmanTime: tour.wollman_time === '' ? null : tour.wollman_time,
        wollmanTime2: tour.wollman_time_2 === '' ? null : tour.wollman_time_2,
        yankeesName: tour.yankees_name === '' ? null : tour.yankees_name,
        ellisIslandDate: tour.ellis_island_date === '' ? null : tour.ellis_island_date,
        guggenNotice: tour.guggen_notice === '' ? null : tour.guggen_notice,
        orderId: orderId,
      };
      const orderTourEntity = queryRunner.manager.create(Tour, newOrderTour);
      await queryRunner.manager.save(orderTourEntity);

      const newOrderTourInfo = {
        whitneyDate: tourInfo.whitney_date === '' ? null : tourInfo.whitney_date,
        whitneyTime: tourInfo.whitney_time === '' ? null : tourInfo.whitney_time,
        guggenDate: tourInfo.guggen_date === '' ? null : tourInfo.guggen_date,
        guggenTime: tourInfo.guggen_time === '' ? null : tourInfo.guggen_time,
        unName: tourInfo.un_name === '' ? null : tourInfo.un_name,
        tourKakaoId: tourInfo.tour_kakakoid === '' ? null : tourInfo.tour_kakakoid,
        airportPickupTime: tourInfo.airport_pickup_time === '' ? null : tourInfo.airport_pickup_time,
        address: tourInfo.address === '' ? null : tourInfo.address,
        addressTo: tourInfo.address_to === '' ? null : tourInfo.address_to,
        flightInfo: tourInfo.flight_info === '' ? null : tourInfo.flight_info,
        contactInfo: tourInfo.contact_info === '' ? null : tourInfo.contact_info,
        orderId: orderId,
      };
      const orderTourInfoEntity = queryRunner.manager.create(TourInfo, newOrderTourInfo);
      await queryRunner.manager.save(orderTourInfoEntity);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
