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
    const data = await this.tripRepository
      .createQueryBuilder('trip')
      .select('trip.date', 'day')
      .addSelect(
        'ROUND(SUM(trip.distance)::numeric, 2)::float as total_distance',
      )
      .addSelect('ROUND(AVG(trip.distance)::numeric, 2)::float as avg_ride')
      .addSelect('ROUND(AVG(trip.price_ride)::numeric, 2)::float as avg_price')
      .where('date >= :after', {
        after: moment().startOf('month'),
      })
      .groupBy('trip.date')
      .orderBy('trip.date')
      .getRawMany();

    return data;
  }
}
