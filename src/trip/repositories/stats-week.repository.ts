import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TripEntity } from '../models/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatsWeekRepository {
  constructor(
    @InjectRepository(TripEntity)
    private readonly statsWeekRepository: Repository<TripEntity>,
  ) {}

  async getTotalDistance(afterDate: string): Promise<number> {
    const totalDistance = await this.statsWeekRepository
      .createQueryBuilder('trip')
      .select('SUM(trip.distance)', 'sum')
      .where('trip.date >= :afterDate ', {
        afterDate: afterDate,
      })
      .getRawOne();
    return totalDistance.sum;
  }
  async getTotalPriceRide(afterDate: string): Promise<number> {
    const totalPriceRide = await this.statsWeekRepository
      .createQueryBuilder('trip')
      .select('SUM(trip.price_ride)', 'sum')
      .where('trip.date >= :afterDate ', {
        afterDate: afterDate,
      })
      .getRawOne();
    return totalPriceRide.sum;
  }
}
