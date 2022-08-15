import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TripEntity } from '../models/post.entity';
import { SummaryMonth } from 'src/common/interfaces/summaryMonth.interfaces';

@Injectable()
export class StatsMonthService {
  constructor(
    @InjectRepository(TripEntity)
    private readonly tripRepository: Repository<TripEntity>,
  ) {}

  async getStatsMonth(): Promise<SummaryMonth[]> {
    const data = this.tripRepository
      .createQueryBuilder('trip')
      .select('trip.date', 'day')
      .addSelect('SUM(trip.distance)', 'total_distance')
      .addSelect('AVG(trip.distance)', 'avg_ride')
      .addSelect('AVG(trip.price_ride)', 'avg_price')
      .where('date >= :after', {
        after: moment().startOf('month'),
      })
      .groupBy('trip.date')
      .orderBy('trip.date')
      .getRawMany();

    return data;
  }
}
