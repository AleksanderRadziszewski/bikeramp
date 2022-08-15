import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TripEntity } from '../models/post.entity';
import { Repository } from 'typeorm';
import { SummaryWeek } from '../../common/interfaces/summaryWeek.interfaces';
import * as moment from 'moment';

@Injectable()
export class StatsWeekService {
  constructor(
    @InjectRepository(TripEntity)
    private readonly statsWeekRepository: Repository<TripEntity>,
  ) {}

  async getData(): Promise<SummaryWeek> {
    const afterDate = moment()
      .subtract(7, 'days')
      .format('YYYY-MM-DD HH:MM:ss.SSSSSS');
    const data = await this.statsWeekRepository
      .createQueryBuilder('trip')
      .select('ROUND(SUM(trip.distance)::numeric,2)::float as total_distance')
      .addSelect(
        'ROUND(SUM(trip.price_ride)::numeric,2):: float as total_price',
      )
      .where('trip.date >= :afterDate ', {
        afterDate: afterDate,
      })
      .getRawOne();
    return {
      total_distance: `${data.total_distance} km`,
      total_price: `${data.total_price} PLN`,
    };
  }
}
