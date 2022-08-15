import { Injectable } from '@nestjs/common';
import { StatsWeekRepository } from '../repositories/stats-week.repository';
import * as moment from 'moment';

@Injectable()
export class StatsWeekService {
  constructor(private readonly statsWeekRepository: StatsWeekRepository) {}

  async getStatsWeek() {
    const afterDate = moment()
      .subtract(7, 'days')
      .format('YYYY-MM-DD HH:MM:ss.SSSSSS');
    const totalDistance = await this.statsWeekRepository.getTotalDistance(
      afterDate,
    );

    const totalPriceRide = await this.statsWeekRepository.getTotalPriceRide(
      afterDate,
    );

    const result = {
      total_distance: `${parseFloat(totalDistance.toFixed(2))} km`,
      total_price: `${parseFloat(totalPriceRide.toFixed(2))} PLN`,
    };
    return result;
  }
}
