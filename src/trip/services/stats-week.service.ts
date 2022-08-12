import { Injectable } from '@nestjs/common';
import { TripEntity } from '../models/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class StatsWeekService {
  constructor(
    @InjectRepository(TripEntity)
    private readonly tripRepository: Repository<TripEntity>,
    private readonly httpService: HttpService,
  ) {}

  async getStatsWeek() {
    const date = new Date();
    const firstDay = new Date(date.setDate(date.getDate() - 7));
    const week_data = await this.tripRepository.find({
      where: {
        date: MoreThan(firstDay),
      },
    });
    const allDistanceData = week_data.map((obj) => obj.distance);
    const allPriceData = week_data.map((obj) => obj.price);

    try {
      const sumDistanceData = parseFloat(
        allDistanceData
          .reduce((previousValue, currentValue) => previousValue + currentValue)
          .toFixed(2),
      );
      const sumPriceData = parseFloat(
        allPriceData
          .reduce((previousValue, currentValue) => previousValue + currentValue)
          .toFixed(2),
      );
      const result = {
        total_distance: `${sumDistanceData} km`,
        total_price: `${sumPriceData} PLN`,
      };
      return result;
    } catch (e) {
      throw new Error('There are no stats for the current week yet');
    }
  }
}
