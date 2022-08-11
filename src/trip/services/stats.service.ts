import { Injectable } from '@nestjs/common';
import { TripEntity } from '../../models/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(TripEntity)
    private readonly tripRepository: Repository<TripEntity>,
  ) {}

  async getStatsWeek() {
    const date = new Date();
    const firstDay = new Date(date.setDate(date.getDate() - 7));
    const weekData = await this.tripRepository.find({
      where: {
        date: MoreThan(firstDay),
      },
    });
    const allDistanceData = weekData.map((obj) => obj.distance);

    try {
      const sumDistanceData = parseFloat(
        allDistanceData
          .reduce((previousValue, currentValue) => previousValue + currentValue)
          .toFixed(2),
      );
      const sumPriceDistanceData = sumDistanceData * 1.5;
      const result = {
        total_distance: `${sumDistanceData} km`,
        total_price: `${sumPriceDistanceData} PLN`,
      };
      return result;
    } catch (e) {
      throw new Error('There are no stats for the current week yet');
    }
  }
}
