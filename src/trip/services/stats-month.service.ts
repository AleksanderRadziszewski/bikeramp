import { Injectable } from '@nestjs/common';
import { TripEntity } from '../models/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import * as _ from 'lodash';

@Injectable()
export class StatsMonthService {
  constructor(
    @InjectRepository(TripEntity)
    private readonly tripRepository: Repository<TripEntity>,
  ) {}

  async getStatsMonth() {
    const summaryMonth = [];
    const date = new Date();
    const data = await this.tripRepository
      .createQueryBuilder('trips')
      .where('date >= :after', {
        after: moment(date).startOf('month').format('YYYY-MM-DD'),
      })
      .andWhere('date <= :before', {
        before: moment(date).endOf('month').format('YYYY-MM-DD'),
      })
      .getRawMany();

    const currentDay = parseInt(moment(date).format('D'));

    for (let i = 1; i <= currentDay; i++) {
      const dayStats = data.filter(
        (obj) => parseInt(moment(obj.trips_date).format('D')) === i,
      );
      if (dayStats.length === 0) {
        continue;
      }
      const totalDistance = dayStats.reduce(
        (prev, curr) => prev.trips_distance + curr.trips_distance,
      );
      const day = moment(dayStats[0].trips_date).format('MMMM, Do');
      const dayPrice = dayStats
        .map((obj) => obj.trips_price)
        .reduce((prevValue, currValue) => prevValue + currValue);
      const avgPrice = parseFloat((dayPrice / dayStats.length).toFixed(2));
      const avgRide = parseFloat((totalDistance / dayStats.length).toFixed(2));

      const summaryDay = {
        day: day,
        total_distance: `${totalDistance} km`,
        avg_ride: `${avgRide} km`,
        avg_price: `${avgPrice} PLN`,
      };
      summaryMonth.push(summaryDay);
    }
    return summaryMonth;
  }
}
