import { Injectable } from '@nestjs/common';
import { TripEntity } from '../models/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class StatsMonthRepository {
  constructor(
    @InjectRepository(TripEntity)
    private readonly statsMonthRepository: Repository<TripEntity>,
  ) {}

  async getTotalDistance(): Promise<any[]> {
    const totalDistance = await this.statsMonthRepository
      .createQueryBuilder()
      .select('trip.date', 'day')
      .addSelect('SUM(trip.distance)', 'total_distance')
      .where('date >= :after', {
        after: moment().startOf('month'),
      })
      .groupBy('trip.date')
      .orderBy('trip.date')
      .getRawMany();

    return totalDistance;
  }
  async getAvgRide(): Promise<any[]> {
    const avgRide = await this.statsMonthRepository
      .createQueryBuilder('trip')
      .select('trip.date', 'day')
      .addSelect('AVG(trip.distance)', 'avg_ride')
      .where('date >= :after', {
        after: moment().startOf('month'),
      })
      .groupBy('trip.date')
      .orderBy('trip.date')
      .getRawMany();
    return avgRide;
  }
  async getAvgPrice(): Promise<any[]> {
    const avgPrice = await this.statsMonthRepository
      .createQueryBuilder('trip')
      .select('trip.date', 'day')
      .addSelect('AVG(trip.price_ride)', 'avg_price')
      .where('date >= :after', {
        after: moment().startOf('month'),
      })
      .groupBy('trip.date')
      .orderBy('trip.date')
      .getRawMany();
    return avgPrice;
  }
}
